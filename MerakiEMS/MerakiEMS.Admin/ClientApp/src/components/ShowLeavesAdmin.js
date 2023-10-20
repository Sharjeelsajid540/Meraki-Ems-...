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
import { fetchAllLeaves , UpdateLeaveStatus } from "../Api/Api";


function ShowLeaves() {

  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [adminRequestViewer, setAdminRequestViewer] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [selectedLeave, setSelectedLeave] = useState();
  const [goToPage, setGoToPage] = useState("");
  const [searchFilter, setSearchFilter] = useState(""); // State for the search filter
  const [leaveData, setLeaveData] = useState([]);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

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
 
  // Define your columns here
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
      header: "Leave Type",
      accessorKey: "leaveType", // Replace with the correct accessorKey for the "Updated At" field
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
    },
  ];

  useEffect(() => {
    fetchAllLeaveData();
  }, []);

  const fetchAllLeaveData = async () => {
    try {
      const data = await fetchAllLeaves();
      setLeaveData(data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

 const refresh = async (event) => {
    event.preventDefault();
    fetchAllLeaveData();
  
 }
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
      fetchAllLeaveData();
    } catch (err) {
      toast.error("Error occurred!");
    }
  };

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
            <Modal show={show} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Update Leave Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                        required
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
          <Button
            variant="secondary"
            className="show-refresh-btn"
            onClick={refresh}
          >
            Refresh
          </Button>{" "}
          <Button
            variant="secondary"
            className="show-calendar-btn"
            onClick={handleShow1}
          >
            Show Calendar
          </Button>{" "}
          <br />
          <GridTable data={leaveData} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default ShowLeaves;
