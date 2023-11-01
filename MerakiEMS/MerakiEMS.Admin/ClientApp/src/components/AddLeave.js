import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import "./css/AddLeave.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { addLeave, fetchLeave, sendEmail} from "../Api/Api";
import { GridTable } from "./GridTable";

const AddLeave = () => {
  const [userID, setuserID] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [description, setDescription] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [LeaveType, setLeaveType] = useState();
  const [isChanged, setIsChanged] = useState(0);
 

  var role = localStorage.getItem("loginData");
  var roleData = JSON.parse(role);
  const uID = localStorage.getItem("loginData");
  const usID = JSON.parse(uID);
  const id = {
    id: usID.id,
  };

 
 


  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "From (Date)",
      accessorKey: "from",
    },
    {
      header: "To (Date)",
      accessorKey: "to",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Reviewed By",
      accessorKey: "adminRequestViewer",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Comments",
      accessorKey: "comments",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
    },
    
    
  ];

  const handleIconClick1 = () => {
    setShow(true);
  };

  const handleIconClick2 = () => {
    setShow(true);
  };

  const navigate = useNavigate();

 
  // Send the email
  const handleSubmit = async (e) => {
    e.preventDefault();
   // Validate the form
  const errors = [];
  if (!from) {
    errors.push("Please enter a from date.");
  }
  if (!to) {
    errors.push("Please enter a to date.");
  }
  if (!LeaveType) {
    errors.push("Please select a leave type.");
  }
  if (!description) {
    errors.push("Please enter a description.");
  }

  // Display any errors to the user
  if (errors.length > 0) {
    toast.error(errors.join("\n"));
    return;
  }
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
    const formattedFromDate = fromDate
      ? fromDate.toISOString().split("T")[0]
      : null;
    const formattedToDate = toDate ? toDate.toISOString().split("T")[0] : null;

    const data = {
      name: roleData.name,
      userID: usID.id,
      from: formattedFromDate,
      to: formattedToDate,
      description: description,
      LeaveType: LeaveType,
    };

    try {
      addLeave(data).then((response) => {
        if (response.isRequestSuccessful === true) {
          toast.success("Request has been Added");
          clear();
          setIsChanged(isChanged + 1);
          handleClose();
          fetchLeave(id).then((response) => {
            setLeaveData(response);
            if (response.length > 0) {
              const latestLeave = response[0];
              const emailData = {
                id: usID.id,
                from: latestLeave.from,
                to: latestLeave.to,
                description: latestLeave.description,
              };
              sendEmail(emailData);
            } else {
              toast.error("Failed to retrieve the latest leave data.");
            }
          });
        } else {
          toast.error(response.data.successResponse);
        }
      });
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Session Expired!");
        navigate("/");
      } else {
        toast.error(error);
      }
    }
  };

  const clear = () => {
    setFrom("");
    setTo("");
    setDescription("");
  };
  useEffect(() => {
    fetchLeave(id).then((response) => {
      setLeaveData(response);
    });
  }, [isChanged]);
 
  return (
    <>
      <div className="addLeave">
        <div>
          <Button
            variant="secondary"
            className="secondary-btn-user"
            onClick={handleShow}
          >
            Add Leave
          </Button>{" "}
        </div>
        <h2>Leaves Status List</h2>
        <br />
        

        <GridTable data={leaveData} columns={columns} />

        <div className="addEmployee">
          <Modal show={show} onHide={handleClose} backdrop="static">
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
                          required
                          selected={from}
                          onChange={(date) => setFrom(date)}
                          dateFormat="yyyy-MM-dd"
                          utcOffset={-300}
                          className="date-picker-input"
                        />
                        <span
                          className="date-picker-icon"
                          onClick={handleIconClick1}
                        >
                          <FontAwesomeIcon icon={faCalendar} />
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formGridEmail2">
                      <Form.Label>To (Date)</Form.Label>

                      <div className="date-picker-container">
                        <DatePicker
                          required
                          selected={to}
                          onChange={(date) => setTo(date)}
                          dateFormat="yyyy-MM-dd"
                          utcOffset={-300}
                          className="date-picker-input"
                        />
                        <span
                          className="date-picker-icon"
                          onClick={handleIconClick2}
                        >
                          <FontAwesomeIcon icon={faCalendar} />
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Leave Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={LeaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Casual">Casual</option>
                      <option value="Sick">Sick</option>
                      <option value="Annual">Annual</option>
                      <option value="Half Day">Half Day</option>
                      <option value="For Hours">For Hours</option>
                    </Form.Control>
                  </Form.Group>
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
                <Button
                  variant="primary"
                  type="submit"
                  className="addBtn"
                  
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AddLeave;
