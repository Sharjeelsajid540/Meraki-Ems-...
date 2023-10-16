import React, { useState , useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./css/Respond.css"
import axios from "axios";
import { GridTable } from "./GridTable";
function LeavesList({ refreshData }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [goToPage, setGoToPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchFilter, setSearchFilter] = useState(''); // State for the search filter
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  
  const columns = [

    {
      header: "Name",
      accessorKey: "name", // Replace with the correct accessorKey for the "Name" field
    },
    {
      header: "From (Date)",
      accessorKey: "from", // Replace with the correct accessorKey for the "From (Date)" field
    },
    {
      header: "To (Date)",
      accessorKey: "to", // Replace with the correct accessorKey for the "To (Date)" field
    },
    {
      header: "Description",
      accessorKey: "description", // Replace with the correct accessorKey for the "Description" field
    },
    {
      header: "Created At",
      accessorKey: "createdAt", // Replace with the correct accessorKey for the "Created At" field
    },
    {
      header: "Reviewed By",
      accessorKey: "adminRequestViewer", // Replace with the correct accessorKey for the "Request Reviewer" field
    },
    {
      header: "Status",
      accessorKey: "status", // Replace with the correct accessorKey for the "Status" field
    },
    {
      header: "Comments",
      accessorKey: "comments", // Replace with the correct accessorKey for the "Comments" field
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt", // Replace with the correct accessorKey for the "Updated At" field
    }
  ];
  
  const fetchAttendanceData = async () => {
    try {
      var role = localStorage.getItem('loginData');
      var roleData = JSON.parse(role);
      var uid = roleData.id;
  
      const response = await axios.post(
        'https://localhost:7206/api/User/GetLeave' ,{
        
            id: uid 
           }
);    
      const data = response.data;
       // Assuming your data is returned as JSON
      
  
      localStorage.setItem('LeaveData', JSON.stringify(data));
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };
  
  useEffect(() => {
    fetchAttendanceData();
  }, [refreshData]);



  

  


  return (
    <div>
      <h2>Leaves Status List</h2>
      <br/> 
      
      <GridTable data={attendanceData} columns={columns} />
       
      </div>
  
  );
}
export default LeavesList;
