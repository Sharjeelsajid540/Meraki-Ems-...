import React, { useState , useEffect } from 'react';
function LeavesList({ refreshData }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const fetchAttendanceData = async () => {
    try { 
      const response = await fetch('https://localhost:7206/api/User/GetLeave');
      const data = await response.json();
      console.log(data);
      localStorage.setItem('LeaveData', JSON.stringify(data));
      setAttendanceData(data);
    } 
    catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };
  useEffect(() => {
    fetchAttendanceData();
  }, [refreshData]);
  return (
    <div>
      <h2>Leaves Status List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>From (Date)</th>
            <th>To (Date)</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Request Viewer</th>
            <th>Status</th>
            <th>Comments</th>
            <th>Updated At</th>         
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.from}</td>
              <td>{entry.to}</td>
              <td>{entry.description}</td> 
              <td>{entry.createdAt}</td>
              <td>{entry.adminRequestViewer}</td>
              <td>{entry.status}</td>
              <td>{entry.comments}</td>
              <td>{entry.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default LeavesList;
