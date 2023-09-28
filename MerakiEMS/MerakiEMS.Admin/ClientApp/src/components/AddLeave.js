import React, { useEffect , useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/AddLeave.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-bootstrap/Modal';
import "./css/AddLeave.css";
import ShowLeavesUser from './ShowLeavesUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const AddLeave = () => {

  const[id,setID]=useState();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[description, setDescription]=useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [isLeaveAdded, setIsLeaveAdded] = useState(false);

  // Retrieve the stored current page number from localStorage
  const storedPageNumber = localStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState(
    storedPageNumber ? parseInt(storedPageNumber, 10) : 1
  );

  // Function to open the date picker when the icon is clicked
  const handleIconClick1 = () => {
    setShow(true); // Show the modal containing the date picker
  };

  const handleIconClick2 = () => {
    setShow(true); // Show the modal containing the date picker
  };


  const fetchAttendanceData = async () => {
    try {
    const response = await fetch('https://localhost:7206/api/User/GetLeave');
    const data = await response.json();
    setAttendanceData(data);
    
    
  } catch (error) {
    console.error('Error fetching attendance data:', error);
  }
};

    const navigate = useNavigate();


    const refreshShowLeavesUser = () => {
      fetchAttendanceData(); // You can also update state or perform any other necessary action here.
    };

    var role = localStorage.getItem('loginData');
    var roleData = JSON.parse(role);

    
      
            // Send the email
const handleSubmit = async (e) => {
  e.preventDefault();
  localStorage.setItem('currentPage', currentPage);
  const uID = localStorage.getItem('loginData');
  const usID = JSON.parse(uID);
  console.log(usID.id);

  // Extract the date part from 'from' and 'to' using .toISOString()
let fromDate = from ? new Date(from) : null;
let toDate = to ? new Date(to) : null;

// Add one day to 'from' and 'to' dates if they are not null
if (fromDate) {
  fromDate.setDate(fromDate.getDate() + 1);
}
if (toDate) {
  toDate.setDate(toDate.getDate() + 1);
}

// Format the dates as ISO strings
const formattedFromDate = fromDate ? fromDate.toISOString().split('T')[0] : null;
const formattedToDate = toDate ? toDate.toISOString().split('T')[0] : null;

const data = {
  name: roleData.name,
  userID: usID.id,
  from: formattedFromDate,
  to: formattedToDate,
  description: description,
};




            
try {
  const response = await axios.post("https://localhost:7206/api/User/AddLeave", data);
            
  if (response.data.isRequestSuccessful === true) {
    // Leave request added successfully
    toast.success("Request has been Added");
    refreshShowLeavesUser();
    setIsLeaveAdded(true);
    clear();
            
      // Now, fetch the latest leave data
      const latestLeaveResponse = await axios.post("https://localhost:7206/api/User/GetAllLeaves", {
      id: usID.id
      });

        const res = await latestLeaveResponse.data; // Access the data property

        if (res.length > 0) {
          const latestLeave = res[0]; // Get the first item as the latest leave

          // Send an email with the latest leave data
        const emailData = {
          id: usID.id,
          from: latestLeave.from,
          to: latestLeave.to,
          description:latestLeave.description
          // Define the email content using the latestLeave data
          // You can use the 'to', 'subject', and 'body' properties as needed
           };
            
        // Send the email
        await axios.post("https://localhost:7206/api/User/SendEmail", emailData);
      } else {
        toast.error("Failed to retrieve the latest leave data.");
      }
    } else {
      toast.error(response.data.successResponse);
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Session Expired!");
      navigate("/");
    } else {
      toast.error(error);
    }
  }
};
            
          
    
    
    localStorage.setItem('currentPage', currentPage);

    const clear = () => {
        
        setFrom("");
        setTo("");
        setDescription("");
      };
    

     
      useEffect(() => {
 
        fetchAttendanceData();
     
      },[]);
  return (


      <div>
      

      <div>
      <Button variant="secondary" className='secondary-btn-user' disabled={isLeaveAdded} onClick={handleShow}>Add Leave</Button>{' '}
      </div>
    <ShowLeavesUser refreshData={refreshShowLeavesUser}/>
    
        <div className="addEmployee">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
             <Modal.Title>Request Leave</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form onSubmit={handleSubmit}>
             <Row className="mt-3">
      <Col>
        <Form.Group controlId="formGridEmail1">
          <Form.Label>From (Date)</Form.Label>

            <div className="date-picker-container">
            <DatePicker
              selected={from}
              onChange={(date) => setFrom(date)}
              dateFormat="yyyy-MM-dd"
              utcOffset={-300}
              className="date-picker-input"
              
            />
              <span className="date-picker-icon" onClick={handleIconClick1}>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
            </div>

        </Form.Group>
      </Col>
      <Col>
      <Form.Group controlId="formGridEmail2">
          <Form.Label >From (Date)</Form.Label>
      
            <div className="date-picker-container">
            <DatePicker
              selected={to}
              onChange={(date) => setTo(date)}
              dateFormat="yyyy-MM-dd"
              utcOffset={-300}
              className="date-picker-input"
            />
              <span className="date-picker-icon" onClick={handleIconClick2}>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
            </div>
      
        </Form.Group>
      </Col>
    </Row>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" className='addBtn' onClick={handleClose}>
        Submit
      </Button>
    </Form>
    </Modal.Body>
    </Modal>
    </div>
  </div>





    
    
  )
}

export default AddLeave;
