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

function ShowLeaves() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [adminRequestViewer, setAdminRequestViewer] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [students, setUsers] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState();
  const [goToPage, setGoToPage] = useState("");
  const [searchFilter, setSearchFilter] = useState(""); // State for the search filter
  const [leaveData, setLeaveData] = useState([]);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    // Fetch leave data from your API or source
    // Replace this with your actual API endpoint
    fetch("http://www.meraki-ams.local/api/User/GetAllLeave")
      .then((response) => response.json())
      .then((data) => {
        // Process the data as needed
        setLeaveData(data);
      })
      .catch((error) => {
        console.error("Error fetching leave data:", error);
      });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const uID = localStorage.getItem("loginData");
  const usID = JSON.parse(uID);

  const leave = localStorage.getItem("LeaveData");
  const lv = JSON.parse(leave);

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
            // console.log(entry.cell.row.original.id); // Log the id here
            handleShow();
          }}
          // disabled={new Date(entry.from) <= new Date()}
        >
          Respond
        </button>
      ),
    },
  ];

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(
        "http://www.meraki-ams.local/api/User/GetAllLeave"
      );
      const data = await response.json();

      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const Load = async () => {
    const result = await axios.get(
      "http://www.meraki-ams.local/api/User/GetAllLeave"
    );
    setUsers(result.data);
  };

  const update = async (event) => {
    event.preventDefault();

    try {
      await axios.put("http://www.meraki-ams.local/api/User/AdminRequest", {
        id: selectedLeave.id,
        status: status,
        adminRequestViewer: usID.name,
        comments: comments,
      });

      toast.success("Request has been Updated");
      setSelectedLeave(null);
      setStatus("");
      setComments("");
      handleClose();
      fetchAttendanceData();
    } catch (err) {
      toast.error("Error occurred!");
    }
  };

  return (
    <>
      <div className="showLeavesAdmin">
        <div>
          <>
            <Modal size="lg" show={show1} onHide={handleClose1}>
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
                        as="textarea"
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
                  &nbsp; &nbsp;
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
          <h2 className="name">Leaves Request List</h2>
          <Button
            variant="secondary"
            className="show-calendar-btn"
            onClick={handleShow1}
          >
            Show Calendar
          </Button>{" "}
          <br />
          <GridTable data={attendanceData} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default ShowLeaves;
