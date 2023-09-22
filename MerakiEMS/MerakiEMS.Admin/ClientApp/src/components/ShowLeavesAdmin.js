import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import './css/Respond.css';
import DatePicker from 'react-datepicker';

function ShowLeaves({ leaveId, onClose }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [adminRequestViewer, setAdminRequestViewer] = useState('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [students, setUsers] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [goToPage, setGoToPage] = useState('');
  const [searchFilter, setSearchFilter] = useState(''); // State for the search filter
  const [from, setFrom] = useState(new Date()); // Initialize "From" date state
  const [to, setTo] = useState(new Date());     // Initialize "To" date state


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const uID = localStorage.getItem('loginData');
  const usID = JSON.parse(uID);

  const leave = localStorage.getItem('LeaveData');
  const lv = JSON.parse(leave);
  console.log(lv);

  useEffect(() => {
    fetchAttendanceData();
    
  }, []);

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

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch('https://localhost:7206/api/User/GetLeave');
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const Load = async () => {
    const result = await axios.get('https://localhost:7206/api/User/GetLeave');
    setUsers(result.data);
  };

  const update = async (event) => {
    event.preventDefault();
    try {
      await axios.put('https://localhost:7206/api/User/AdminRequest', {
        id: selectedLeave.id,
        status: status,
        adminRequestViewer: usID.name,
        comments: comments,
      });
      toast.success('Request has been Updated');
      setSelectedLeave(null);
      setStatus('');
      setComments('');
      handleClose();
      fetchAttendanceData();
    } catch (err) {
      toast.error('Error occurred!');
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    // When attendanceData changes, set the initial "From" and "To" dates
    if (attendanceData.length > 0) {
      const fromDate = attendanceData[0].from; // Assuming the "from" property holds the date
      const toDate = attendanceData[0].to;     // Assuming the "to" property holds the date
      
      setFrom(new Date(fromDate)); // Convert the date string to a JavaScript Date object
      setTo(new Date(toDate));
    }
  }, [attendanceData]);


  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Leave Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              &nbsp;
              &nbsp;
              <Button
                className="secondary-btn-respond"
                variant="success"
                type="submit"
                onClick={update}
              >
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
      <h2>Leaves Request List</h2>
      <br/> 
      {/* Search filter input */}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
             <td> 
        <Col>
          <Form.Group controlId="formGridFrom">
            <Form.Label>From (Date)</Form.Label>
            <DatePicker
              selected={from}
              onChange={(date) => setFrom(date)}
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>
        </Col>
        </td>
        <td><Col>
          <Form.Group controlId="formGridFrom">
            <Form.Label>From (Date)</Form.Label>
            <DatePicker
              selected={to}
              onChange={(date) => setFrom(date)}
              dateFormat="yyyy-MM-dd"
            />
          </Form.Group>
        </Col></td>
              <td>{entry.description}</td>
              <td>{entry.createdAt}</td>
              <td>{entry.adminRequestViewer}</td>
              <td>{entry.status}</td>
              <td>{entry.comments}</td>
              <td>{entry.updatedAt}</td>
              <td>
                <Button
                  className="secondary-btn-respond"
                  variant="success"
                  onClick={() => {
                    setSelectedLeave(entry);
                    handleShow();
                  }}
                >
                  Respond
                </Button>{' '}
              </td>
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
          {Array(Math.ceil(filteredData.length / itemsPerPage))
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
          {currentPage < Math.ceil(filteredData.length / itemsPerPage) && (
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
            max={Math.ceil(filteredData.length / itemsPerPage)}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
          />
          <button
            className="go-to-page-button"
            onClick={() => {
              if (goToPage >= 1 && goToPage <= Math.ceil(filteredData.length / itemsPerPage)) {
                paginate(parseInt(goToPage));
              }
            }}
          >
            Go
          </button>
        </div>
        {/* Page x of y */}
        <div className="page-info">
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </div>
      </div>
    </div>
  );
}

export default ShowLeaves;
