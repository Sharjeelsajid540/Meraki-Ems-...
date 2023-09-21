import React, { useState , useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function LeavesList({ refreshData }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [goToPage, setGoToPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchFilter, setSearchFilter] = useState(''); // State for the search filter
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
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

  useEffect(() => {
    // When the searchFilter or attendanceData changes, apply the filter
    const filtered = attendanceData.filter((entry) => {
      return (
        entry.id.toString().includes(searchFilter) ||
        entry.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchFilter, attendanceData]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);

   // Change page
   const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(attendanceData.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  


  return (
    <div>
      <h2>Leaves Status List</h2>
      <br/> 
      <div className="search-filter">
      <Form.Control
        type="text"
        placeholder="Search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
            
      />
        
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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
          {currentItems.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
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
       {/* Pagination */}
       <div className="pagination-container">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="page-link"
              >
                Prev
              </button>
            </li>
          )}
          {Array(Math.ceil(attendanceData.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`page-link ${
                    index + 1 === currentPage ? 'active' : ''
                  } ${index + 1 > 10 ? 'new-page-button' : ''}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          {currentPage < Math.ceil(attendanceData.length / itemsPerPage) && (
            <li className="page-item">
              <button
                onClick={() => paginate(currentPage + 1)}
                className="page-link"
              >
                Next
              </button>
            </li>
          )}
        </ul>
        {/* Go to Page input */}
        <div className="go-to-page">
          <span>Go to Page:&nbsp;</span>
          <input
            type="number"
            min="1"
            max={Math.ceil(attendanceData.length / itemsPerPage)}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
          />
          <button
            className="go-to-page-button"
            onClick={() => {
              if (goToPage >= 1 && goToPage <= Math.ceil(attendanceData.length / itemsPerPage)) {
                paginate(parseInt(goToPage));
              }
            }}
          >
            Go
          </button>
        </div>
        {/* Page x of y */}
        <div className="page-info">
          Page {currentPage} of {Math.ceil(attendanceData.length / itemsPerPage)}
        </div>
      </div>
    </div>
  );
}
export default LeavesList;
