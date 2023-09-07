import React, { useState,useEffect } from 'react';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);
 

  // Replace this with an API call to fetch attendance data
  const fetchAttendanceData = async () => {
    try {
      const response = await fetch('https://localhost:7206/api/User/UserAttendance');
      const data = await response.json();
     
      setAttendanceData(data);
      localStorage.setItem('attendList', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
    
  };

  // Call the API to fetch attendance data when the component mounts
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h2>Employee Attendance</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Total Hours Worked</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.userID}</td>
              <td>{entry.checkInTime || 'N/A'}</td>
              <td>{entry.checkOutTime || 'N/A'}</td>
              <td>{entry.workingHours || 'N/A'}</td>
              <td>{entry.createdAt || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
