import React, { useState,useEffect, useMemo } from 'react';
import './CheckBtn.css';
import { CheckInUser, CheckOutUser, fetchAttendanceData } from '../Api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AttendanceList.css';
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import moment from 'moment-timezone';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [buttonText, setButtonText] = useState('CheckedIN');
  const [isChanged, setIsChanged] = useState(0);
  const [isCheckInDisabled, setIsCheckInDisabled] = useState(false);
  const [isCheckOutDisabled, setIsCheckOutDisabled] = useState(false);

  const pakistanTimezone = 'Asia/Karachi';
  const currentTimeInPakistan = moment.tz(pakistanTimezone);
  const startTime = moment.tz('09:00', 'HH:mm', pakistanTimezone);
  const endTime = moment.tz('19:00', 'HH:mm', pakistanTimezone);

  

 

  useEffect(() => {
    
    if (currentTimeInPakistan.isBetween(startTime, endTime)) {
      setIsCheckInDisabled(false);
    } else {
      setIsCheckInDisabled(true);
    }
    setIsCheckOutDisabled(localStorage.getItem('hasCheckedOut') === 'true');
  
  }, [currentTimeInPakistan]);
 

  

  const id = localStorage.getItem('loginData');
  var idData = JSON.parse(id);
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


  const handleCheckIn = async () => {
    if (!isCheckInDisabled) {
   
    try {
      const data = {
        userID: idData.id,
      };
      const response = await CheckInUser(data);
      if (response && response.isRequestSuccessfull === "true") {
        toast.success(response.successMessage);
        setIsChanged(isChanged + 1);
        setIsCheckInDisabled(true);
        if (!localStorage.getItem('lastClickedDate')) {
          localStorage.setItem('lastClickedDate', moment().format('YYYY-MM-DD'));
        }
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
    
    if (!localStorage.getItem('lastClickedDate')) {
      localStorage.setItem('lastClickedDate', moment().format('YYYY-MM-DD'));
    }
    localStorage.setItem('hasCheckedOut', 'false');
    
  }
  };

  const handleCheckOut = async () => {
    if (!isCheckOutDisabled) {
      
    const data={
      attendanceID: attendID.attendanceID,
      
      userID: idData.id,
    }
   const response = await CheckOutUser(data);
   try{
   
      if (response.isRequestSuccessfull =="true") {
        toast.success(response.successMessage);
        setIsChanged(isChanged + 1);
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

    
    setIsCheckOutDisabled(true);
    localStorage.setItem('hasCheckedOut', 'true');
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
       { isCheckInDisabled ? "Checked IN" : "CheckIn"}
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
       { isCheckInDisabled ? "Checked Out" : "CheckOut"}
      </button>
     
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
