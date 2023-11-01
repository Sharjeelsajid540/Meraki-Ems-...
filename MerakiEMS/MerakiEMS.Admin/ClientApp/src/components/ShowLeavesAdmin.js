import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./css/Respond.css";
import { GridTable } from "./GridTable";
import { fetchAllLeaves , UpdateLeaveStatus, getPendingLeaves } from "../Api/Api";





function ShowLeaves() {


  const [isLeaveFilter, setLeaveFilter] = useState(true);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [adminRequestViewer, setAdminRequestViewer] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [selectedLeave, setSelectedLeave] = useState();
  const [goToPage, setGoToPage] = useState("");
  const [searchFilter, setSearchFilter] = useState(""); // State for the search filter
  const [leaveData, setLeaveData] = useState([]);
  const [count, setCount] = useState(0);



  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);



  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false); // Updated to open the modal instead of closing it
  const handleShow3 = () => setShow3(false);



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);



  const uID = localStorage.getItem("loginData");
  const usID = JSON.parse(uID);
  const leave = localStorage.getItem("LeaveData");
  const lv = JSON.parse(leave);
  const errors = [];

  const selectedLeaveFields = [ "description","adminRequestViewer","comments","createdAt","updatedAt",];
  const selectedNameFields = [ "name","from","to","description"];

  

  const columns = [
    {
      header: "Name",
      accessorKey: "name", 
    },
    {
      header: "From",
      accessorKey: "from", 
    },
    {
      header: "To",
      accessorKey: "to", 
    },

    {
      header: "Leave Type",
      accessorKey: "leaveType", 
    },
    {
       header: "Status",
      accessorKey: "status", 
    },
    {
      header: "Details",
      cell: (entry) => (
        <button
          className="secondary-btn-respond"
          variant="success"
          onClick={() => {
            setSelectedLeave(entry.cell.row.original);
            setShow3(true);
          }}         
        >
          Details
        </button>
      ),
    },
    
    
    {
      header: "Action",
      cell: (entry) => (
        <button
          className="secondary-btn-respond"
          variant="success"
          onClick={() => {                      
          setSelectedLeave(entry.cell.row.original);
          handleShow();
          }}         
        >
          Respond
        </button>
      ),
    }
    
  ];

 



  const update = async (event) => {
    event.preventDefault();
    if (!comments) {
      errors.push("Please enter a Username.");
    }
    if (!status) {
      errors.push("Please select Severity.");
    }
    const data={
      id: selectedLeave.id,
      status: status,
      adminRequestViewer: usID.name,
      comments: comments,
    }
 

    try {
      await UpdateLeaveStatus(data);
      toast.success("Request has been Updated");
      setSelectedLeave(null);
      setStatus("");
      setComments("");
      handleClose();
      setCount(count + 1);
      getPendingLeaves(isLeaveFilter);
      
 
    } catch (err) {
      toast.error("Error occurred!");
    }
  };


  
  useEffect(() => {
    
    getPendingLeaves(isLeaveFilter)
      .then((response) => {
        if(response){
          setLeaveData(response);
       }
      });
      
  }, [isLeaveFilter, count]);
  useEffect(() => {

    if (selectedLeave) {
      setStatus(selectedLeave.status);
    }
  }, [selectedLeave]);

  const refresh = async (event) => {
    event.preventDefault();
    await getPendingLeaves(isLeaveFilter);
    setCount(count + 1);
  }
  
  return (
    <>
     <div className="showLeavesAdmin">
        <div>
          <>
            <Modal size="lg" show={show1} onHide={handleClose1} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Calendar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={leaveData.map((leave) => ({
                    title: `${leave.name} (${leave.description})`, // Display leave name as the event title
                    start: leave.from, // Start date of the leave
                    end: leave.to, // End date of the leave
                  }))}
                />
              </Modal.Body>
            </Modal>
          </>         
          <>
          <>
  <Modal size="xl" show={show3} onHide={handleClose3}>
    <Modal.Header closeButton>
      <Modal.Title>Leave Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedLeave ? ( 
        <table>
          <tbody>
            {selectedLeaveFields.map((field) => (
              <tr key={field}>
                <td className="name-column">{field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()}</td> 
                <td>{selectedLeave[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data selected.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose3}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</>
</>
        <>
            <Modal  show={show} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Update Leave Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {selectedLeave ? (
                        <table>
                          <tbody>
                            {selectedNameFields.map((field) => (
                              <tr key={field}>
                                <td className="name-column">{field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()}</td>                                
                                <td >{selectedLeave[field]}</td>                             
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No data selected.</p>
                      )}
                <Form onSubmit={update}>
                <Row className="mt-3">
                    <Form.Group as={Col} controlId="formGridStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">
                          Pending
                        </option>
                        <option value="Approved" >
                          Approved
                        </option>
                        <option value="Rejected" >
                          Rejected
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Row>

                  <Row className="mt-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Comments</Form.Label>
                    <Form.Control                     
                       rows={3}
                        as="textarea"
                        type="name"
                        placeholder="Enter Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </Form.Group>
                  </Row>
                  <Button variant="secondary" 
                  onClick={handleClose}>
                    Close
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    className="secondary-btn-respond"
                    variant="success"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
         </>
          <h2 className="leave-request-name">Leaves Request List</h2>
          <div className="radio-button">
        <label>
          <input
            type="radio"
            value="true"
            checked={isLeaveFilter === true}
            onChange={() => setLeaveFilter(true)}
          />&nbsp;
          Show Pending Leaves
        </label>
        &nbsp;
        &nbsp;
        <label>
          <input
            type="radio"
            value="false"
            checked={isLeaveFilter === false}
            onChange={() => setLeaveFilter(false)}
          />
          &nbsp;
          Show All Leaves
        </label>

        
        
      </div>
      
      
      <div className="button-container">
    
      <Button
        variant="secondary"
        className="btn-color"
        onClick={refresh}
      >
        Refresh
      </Button>{" "}
      &nbsp;
      <Button
        variant="secondary"
        className="btn-color"
        onClick={handleShow1}
      >
        Show Calendar
      </Button>{" "}
    </div>
        <div className="grid">
          <GridTable data={leaveData} columns={columns} />
        </div>
        </div>
      </div>
    </>
  );

}
export default ShowLeaves;