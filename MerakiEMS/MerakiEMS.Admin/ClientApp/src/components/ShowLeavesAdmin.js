import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import { UpdateLeaveStatus } from "../Api/Api";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import "./css/Respond.css";


function ShowLeaves({ leaveId, onClose }) {  
    const [attendanceData, setAttendanceData] = useState([]);
   
    const [adminRequestViewer, setAdminRequestViewer] = useState("");
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState("");
    const [id, setId] = useState("");
    const [students, setUsers] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);


    const uID = localStorage.getItem('loginData');
    const usID = JSON.parse(uID);

    const leave = localStorage.getItem('LeaveData');
    const lv = JSON.parse(leave);
    console.log(lv)


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function Load() {
    
      const result = await axios.get("https://localhost:7206/api/User/GetLeave");
      setUsers(result.data);
      
    }

  

   
  
    const fetchAttendanceData = async () => {
        try {
        const response = await fetch('https://localhost:7206/api/User/GetLeave');
        const data = await response.json();
        setAttendanceData(data);
        Load();
        
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
  
   

    async function update(event) {
      event.preventDefault();
      try {
        await axios.put("https://localhost:7206/api/User/AdminRequest", {
          id: selectedLeave.id,
          status: status,
          adminRequestViewer: usID.name,
          comments: comments
        });
        toast.success("Request has been Updated");
        setSelectedLeave(null);
        setStatus("");
        setComments("");
        handleClose();
      
        fetchAttendanceData();
      } catch (err) {
        toast.error("Error occured!");
      }
    }
    useEffect(() => {
      fetchAttendanceData();
      (async () => await Load())();
    },[] );
    

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
      <Button className="secondary-btn-respond" variant="success" type="submit" onClick={update}>
        Update
      </Button>
    </Form>
  </Modal.Body>
</Modal>

      </>
      <h2>Leaves Request List</h2>
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
              
              <td><Button className='secondary-btn-respond' variant="success" onClick={() => {
      setSelectedLeave(entry);
      handleShow();
    }}>Respond</Button>{' '}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowLeaves;
