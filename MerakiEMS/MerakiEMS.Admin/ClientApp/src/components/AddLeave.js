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
import { DeleteLeaveByID, addLeave, fetchLeave, sendEmail } from "../Api/Api";
import { GridTable } from "./GridTable";
import Loader from "./Loader";

const AddLeave = () => {
  const [userID, setuserID] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [show, setShow] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const handleCloseComments = () => setShowComments(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowComments = () => setShowComments(true);
  const [description, setDescription] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [LeaveType, setLeaveType] = useState();
  const [isChanged, setIsChanged] = useState(0);
  const [selectedLeave, setSelectedLeave] = useState();
  const [comments, setComments] = useState("");
  const [updateData, setUpdateData] = useState(false);

  const [iddd, setIddd] = useState();
  const [deleteModal, setDeleteModal] = useState(false)
  const [loader, setLoader] = useState(false);

  const openDeleteModal = (id) => {
    setIddd(id)
    setDeleteModal(true);
  }
  const closeDeleteModal = () => {
    setDeleteModal(false);
  }




  var role = localStorage.getItem("loginData");
  var roleData = JSON.parse(role);
  const uID = localStorage.getItem("loginData");
  const usID = JSON.parse(uID);

  const DeleteLeave = (event) => {
    event.preventDefault(); // Prevent the default behavior (e.g., page refresh) on button click


    DeleteLeaveByID(iddd).then((response) => {
      if (response) {
        if (response.isRequestSuccessful) {
          fetchLeave(id).then((response) => {
            setLeaveData(response);
            setDeleteModal(false);
          });


        }
      } else {

      }

    });
  };

  const id = {
    id: usID.id,
  };

  const columns = [
    // {
    //   header: "Name",
    //   accessorKey: "name",
    // },
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
      header: "Updated At",
      accessorKey: "updatedAt",
    },
    {
      header: "",
      accessorKey: "comments",
      cell: (entry) => (
        <button
          className="btn btn-respond"
          variant="success"
          onClick={() => {
            setSelectedLeave(entry.cell.row.original.comments);
            handleShowComments();
          }}
        >
          Comments
        </button>
      ),
    },
    {
      header: "",
      accessorKey: "comments",
      cell: (entry) => entry.row.original.status == "Pending" ? (
        <button
          className="btn btn-custom"
          variant="success"
          onClick={() => {
            // setSelectedLeave(entry.cell.row.original.comments);
            openDeleteModal(entry.cell.row.original.id);
          }}
        >
          Delete
        </button>)
        : (""),
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
    // e.preventDefault();
    setLoader(true);
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
          setLoader(false);
          clear();
          setIsChanged(isChanged + 1);
          handleClose();
          fetchLeave(id).then((response) => {
            setLeaveData(response);
            // if (response.length > 0) {
            //   const latestLeave = response[0];
            //   const emailData = {
            //     id: usID.id,
            //     from: latestLeave.from,
            //     to: latestLeave.to,
            //     description: latestLeave.description,
            //   };
            //   sendEmail(emailData);
            // } else {
            //   toast.error("Failed to retrieve the latest leave data.");
            // }
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
  }, [isChanged,]);

  return (
    <>
      {loader && <Loader />}
      <Modal show={showComments} onHide={handleCloseComments} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mt-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  rows={3}
                  as="textarea"
                  type="name"
                  placeholder="Enter Comments"
                  value={selectedLeave}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={handleCloseComments}>
              Close
            </Button>
            &nbsp; &nbsp;
          </Form>
        </Modal.Body>
      </Modal>

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
                      <option value="One Hours">One Hours</option>
                      <option value="Two Hours">Two Hours</option>
                      <option value="Three Hours">Three Hours</option>
                      <option value="Four Hours">Four Hours</option>
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
                <Button variant="primary" type="submit" className="addBtn">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      {/* {
        deleteModal && (
          <>
         <div className="deletepopup">
  <div className="row">
    <label htmlFor="" className="textclr"> Are you sure you want to delete?</label>
  </div>
  <div className="row mt-3">
    <button className="btn btn-custom col-6" onClick={(event) => DeleteLeave(event)}>
      Delete
    </button>
    <button className="btn btn-custom col-6" onClick={closeDeleteModal}>
      Cancel
    </button>
  </div>
</div>
          
          </>
        )
      } */}
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Check-Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeDeleteModal}
          >

            Cancel
          </Button>
          <Button variant="primary" onClick={(event) => DeleteLeave(event)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLeave;
