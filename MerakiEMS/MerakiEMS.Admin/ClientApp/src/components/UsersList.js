import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

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
      <h2>Users List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>User Role</th>
            <th>Password</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.employeeId}</td>
              <td> <Button variant="warning">Warning</Button>{' '}</td>
              <td><Button variant="danger">Danger</Button>{' '}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
