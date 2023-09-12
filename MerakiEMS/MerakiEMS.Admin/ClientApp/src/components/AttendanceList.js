import React, { useState,useEffect } from 'react';
import './CheckBtn.css';
import { CheckInUser, CheckOutUser, fetchAttendanceData } from '../Api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AttendanceList.css';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [isChanged, setIsChanged] = useState(0);



  const id = localStorage.getItem('loginData');
  var idData = JSON.parse(id);
  const attendId = localStorage.getItem('AttendanceID');
  var attendID = JSON.parse(attendId);


  const handleCheckIn = async () => {
    try {
      const data = {
        userID: idData.id,
      };
  
      const response = await CheckInUser(data);
  
      console.log(response)
  
      if (response && response.isRequestSuccessfull === "true") {
        setButton1Clicked(true);
        toast.success(response.successMessage);
        setIsChanged(isChanged + 1);
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
  };

  const handleCheckOut = async () => {
    const data={
      attendanceID: attendID.attendanceID,
      
      userID: idData.id,
    }
   const response = await CheckOutUser(data);
   try{
   
      if (response.isRequestSuccessfull =="true") {
        toast.success(response.successMessage);
        setIsChanged(isChanged + 1);
        setButton2Clicked(true);
      }
      else if (response && response.errors) {
        console.log(response.errors);
        toast.error("Something Went Wrong");
      } 
       else {
        console.error('Error checking out:', response.data);
      }
    } catch (error) {
      console.error('Error checking out:', error);
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

 console.log(attendanceData)
 

  return (<>
  <div className="container">
  <div className="row">
  <div className="col-md-6">
   <div>
      <h2>Check-In</h2>
      <button className={`btn btn-1 ${button1Clicked ? 'btn-clicked' : ''}`} onClick={()=>handleCheckIn()}>
        {button1Clicked ? "Checked-In" : "Check-In"}
      </button>
    </div>
    </div>
    <div className="col-md-6">
    <div>
      <h2>Check-Out</h2>
      <button
        className={`btn btn-1 ${button2Clicked ? 'btn-clicked' : ''}`}
        onClick={handleCheckOut}
      >
        {button2Clicked ? "Checked-Out" : "Check-Out"}
      </button>
     
    </div>
    </div>
    </div>
    <div className="row">
        <div className="col-md-12">
    <div>
      <h2>Employee Attendance</h2>
      <div>
  {attendanceData.groupedAttendanceList ? (
    attendanceData.groupedAttendanceList.map((entry) => (
      <div key={entry.attendanceDate}>
        <table className="table">
          <thead>
            <tr>
              <th colSpan="6" className="DateHeader">
                Date: {entry.attendanceDate} Total Hours Worked: {entry.totalWorkingHours}
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
</div>



        </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default AttendanceList;
