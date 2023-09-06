import React, { useState } from 'react';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);

  // Replace this with an API call to fetch attendance data
  // const fetchAttendanceData = async () => {
  //   try {
  //     const response = await fetch('YOUR_API_ENDPOINT');
  //     const data = await response.json();
  //     setAttendanceData(data);
  //   } catch (error) {
  //     console.error('Error fetching attendance data:', error);
  //   }
  // };

  // Call the API to fetch attendance data when the component mounts
  // useEffect(() => {
  //   fetchAttendanceData();
  // }, []);

  return (
    <div>
      <h2>Employee Attendance</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Total Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.employeeId}</td>
              <td>{entry.checkInTime || 'N/A'}</td>
              <td>{entry.checkOutTime || 'N/A'}</td>
              <td>{entry.totalHoursWorked || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
