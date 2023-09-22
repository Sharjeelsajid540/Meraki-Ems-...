import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Modal from 'react-bootstrap/Modal';

const MyCalendar = () => {
    const [leaveData, setLeaveData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
      // Fetch leave data from your API or source
      // Replace this with your actual API endpoint
      fetch('https://localhost:7206/api/User/GetLeave')
        .then((response) => response.json())
        .then((data) => {
          // Process the data as needed
          setLeaveData(data);
        })
        .catch((error) => {
          console.error('Error fetching leave data:', error);
        });
    }, []);
  
    return (

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Leave Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={leaveData.map((leave) => ({
          title: leave.name, // Display leave name as the event title
          start: leave.from, // Start date of the leave
          end: leave.to // End date of the leave
   

        }))}
      />
      </Modal.Body>
        </Modal>
    );
  };
  
  export default MyCalendar;
  