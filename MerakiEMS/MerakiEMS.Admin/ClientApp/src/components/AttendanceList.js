import React, { useState,useEffect, useMemo } from 'react';
import './css/CheckBtn.css';
import { CheckInUser, CheckOutUser, fetchAttendanceData } from '../Api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import moment from 'moment-timezone';
import { Button, Modal } from 'react-bootstrap';
import './css/AttendanceList.css';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isChanged, setIsChanged] = useState(0);
  const [isCheckInDisabled, setIsCheckInDisabled] = useState(false);
  const [isCheckOutDisabled, setIsCheckOutDisabled] = useState(true);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);



  const pakistanTimezone = 'Asia/Karachi';
  const currentTimeInPakistan = moment.tz(pakistanTimezone);
  const startTime = moment.tz('09:00', 'HH:mm', pakistanTimezone);
  const endTime = moment.tz('19:00', 'HH:mm', pakistanTimezone);

  

  

  useEffect(() => {
    const storedIsCheckInDisabled = localStorage.getItem('isCheckInDisabled');
    const storedIsCheckOutDisabled = localStorage.getItem('isCheckOutDisabled');

    if (storedIsCheckInDisabled === 'true') {
      setIsCheckInDisabled(true);
    }

    if (storedIsCheckOutDisabled === 'true') {
      setIsCheckOutDisabled(true);
    }
    if (storedIsCheckOutDisabled === 'false') {
      setIsCheckOutDisabled(false);
    }
    
    if (currentTimeInPakistan.isBetween(startTime, endTime)) {
      
    } else {
      setIsCheckInDisabled(true);
    }
    
  
  }, [currentTimeInPakistan]);
 

  

  const id = localStorage.getItem('loginData');
  var idData = JSON.parse(id);
  var userName = idData.name;
  const attendId = localStorage.getItem('AttendanceID');
  var attendID = JSON.parse(attendId);

const columns = [
  {
    header:'CheckIn Time',
    accessorKey:'checkInTime',
  },
  {
    header:'CheckOut Time',
    accessorKey:'checkOutTime',
  },
  {
    header:'Working Hours',
    accessorKey:'workingHours',
  },
  {
    header:'Date',
    accessorKey:'createdAt',
  }
  
]


const confirmCheckIn = async () => {
  // Perform Check-In action

  
    try {
      const data = {
        userID: idData.id,
      };
      const response = await CheckInUser(data);
      if (response && response.isRequestSuccessfull === "true") {
        toast.success(response.successMessage);
        setIsChanged(isChanged + 1);
        setIsCheckInDisabled(true);
        localStorage.setItem('isCheckInDisabled', 'true');
        localStorage.setItem('isCheckOutDisabled', 'false');
        
      } 
      else if (response && response.isRequestSuccessfull==="false") {
        toast.error(response.successMessage);
        
      }
      else if (response && response.errors) {
        console.log(response.errors);
        toast.error("Something Went Wrong");
      } 
      else {
        console.log("Unexpected response:", response);
        toast.error("Unexpected response from the server");
      }
    } 
    catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while processing your request");
    }
    setShowCheckInModal(false);
  };


const confirmCheckOut = async () => {
  const data={
    attendanceID: attendID.attendanceID,
    
    userID: idData.id,
  }
 const response = await CheckOutUser(data);
 try{
 
    if (response.isRequestSuccessfull =="true") {
      toast.success(response.successMessage);
      setIsChanged(isChanged + 1);
      localStorage.setItem('isCheckOutDisabled', 'true');
    }
    else if (response && response.isRequestSuccessfull==="false") {
      toast.error(response.successMessage);
    }
    else if (response && response.errors) {
      
      toast.error("Something Went Wrong");
    } 
     else {
      console.error('Error checking out:', response.data);
    }
  } catch (error) {
    console.error('Error checking out:', error);
  }
  
    setShowCheckOutModal(false); 
};
  

const handleCheckIn = async () => {
    if (!isCheckInDisabled) {
      setShowCheckInModal(true);
  }
  };

  
  
  const handleCheckOut = async () => {
    if (!isCheckOutDisabled) {
      setShowCheckOutModal(true);
  }
  };
  
  useEffect(() => {
    const data = {
      userID: idData.id,
    };
    
    fetchAttendanceData(data).then((response) => {
      if (response) {
        
        setAttendanceData(response);
      }
      
    });
  }, [isChanged]);


 const data = useMemo(()=> attendanceData,[attendanceData])
 
 const table =useReactTable({
  data,
  columns, 
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel()},
  
);

table.getState().pagination.pageSize = 7;
  return (<>
  <div className="container">
  <div className="row">
  <div className="col-md-6">
   <div>
      <h2>Check-In</h2>
      <button className={`btn btn-1 ${isCheckInDisabled  ? 'btn-clicked' : ''}`} onClick={handleCheckIn} disabled={isCheckInDisabled }>
       { isCheckInDisabled ? "Checked IN ✓" : "CheckIn"}
      </button>
    </div>
    </div>
    <div className="col-md-6">
    <div>
      <h2>Check-Out</h2>
      <button
        className={`btn btn-1 ${isCheckOutDisabled  ? 'btn-clicked' : ''}`}
        onClick={handleCheckOut}
        disabled={isCheckOutDisabled }
      >
       { isCheckOutDisabled ? "Checked Out   ✓" : "CheckOut"}
      </button>
      <Modal show={showCheckInModal} onHide={() => setShowCheckInModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Check-In</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Check-In?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckInModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmCheckIn}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={showCheckOutModal} onHide={() => setShowCheckOutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Check-Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Check-Out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckOutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmCheckOut}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
     
    </div>
    </div>
    </div>
    <div className="row">
        <div className="col-md-12">
    <div>
      <h2>Employee Attendance</h2>
      <table className="table">
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>  
          {headerGroup.headers.map(header => (
            <th key={header.id}>
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </th>
          ))}
          </tr>
        ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell,
                    cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
         
        </tbody>
      </table>
      <div className="menu-list">
      <div className="FooterOptions">
        <button className='FooterBtn' onClick={()=> table.setPageIndex(0)}>{'<<'}</button>
        <button className='FooterBtn' disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()}>{'<'}</button>
        <button className='FooterBtn' disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()}>{'>'}</button>
        <button className='FooterBtn' onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>{'>>'}</button>
        <span className="FooterOptions">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="FooterOptions">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
      </div>
      {/* <div>
  {attendanceData.groupedAttendanceList ? (
    attendanceData.groupedAttendanceList.map((entry) => (
      <div key={entry.attendanceDate}>
        <table className="table">
          <thead>
            <tr>
              <th colSpan="3" className="DateHeader1">
                Date: {entry.attendanceDate} 
              </th>
              <th colSpan="3" className="DateHeader2">
                 Total Hours Worked: {entry.totalWorkingHours}
              </th>
            </tr>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Hours Worked</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {entry.attendanceList.map((listItem) => (
              <tr key={listItem.id}>
                <td>{listItem.userID}</td>
                <td>{listItem.name}</td>
                <td>{listItem.checkInTime || 'N/A'}</td>
                <td>{listItem.checkOutTime || 'N/A'}</td>
                <td>{listItem.workingHours || 'N/A'}</td>
                <td>{listItem.createdAt || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
  ) : (
    <div>Loading data...</div>
  )}
</div> */}



        </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default AttendanceList;
