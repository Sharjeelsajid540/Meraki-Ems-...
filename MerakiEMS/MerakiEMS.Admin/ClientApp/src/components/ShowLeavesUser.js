import React, { useState, useEffect } from "react";

function LeavesList() {
  const [attendanceData, setAttendanceData] = useState([]);
  // const [isChanged, setIsChanged] = useState(0);
  // setIsChanged(isChanged + 1);
  // [isChanged]

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch("https://localhost:7206/api/User/GetLeave");
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h2>Leaves Status List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>From (Date)</th>
            <th>To (Date)</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.userID}</td>
              <td>{entry.from}</td>
              <td>{entry.to}</td>
              <td>{entry.description}</td>
              <td>{entry.status}</td>
              <td>{entry.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeavesList;
