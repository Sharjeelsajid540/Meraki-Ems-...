import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function ShowLeaves() {
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
      <h2>Leaves Request List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>From (Date)</th>
            <th>To (Date)</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.employeeId}</td>
              <td>
                <Button variant="success">Edit</Button>{" "}
              </td>
              <td>
                <Button variant="success">Approve</Button>{" "}
              </td>
              <td>
                <Button variant="danger">Delete</Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowLeaves;
