import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { GridTable } from "./GridTable";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SideNavbar } from "./SideNavbar";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import { Profile } from "./Profile";
import "./css/Performance.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  addPerform,
  fetchPerformData,
  updatePerformance,
  DeletePerformance,
} from "../Api/Api";

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [severity, setSeverityType] = useState(""); // Initialize as an empty string
  const [comments, setComments] = useState(""); // Initialize as an empty string
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const [selectedUserName, setSelectedUserName] = useState(""); // Selected user name
  const [usersNames, setUsersNames] = useState([]);
  const [isChanged, setIsChanged] = useState(0);
  const [date, setDate] = useState();
  const [updateShow, setUpdateShow] = useState(false);
  const [deleteshow, setDeleteShow] = useState(false);
  const [performanceID, setPerformanceID] = useState();
  const [id, setPerformancesID] = useState();
  const [count, setCount] = useState(0);
  const fetchPerformanceData = async () => {
    try {
      const data = await fetchPerformData();
      setPerformanceData(data.successResponse);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };
  const handleDelete = async (e) => {
    console.log("nccnncncn");
    e.preventDefault();

    console.log("nccnncncn");
    try {
      await DeletePerformance(id).then((response) => {
        if (response.isRequestSuccessful) {
          toast.success("DeletePerformance Successfully");
          clear();
          // fetchinterviewData();
          handleDeleteClose();
          setCount(count + 1);
        } else {
          toast.error("Failed to Delete Performance");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit() called");

    // Disable the submit button.
    e.target.disabled = true;

    const errors = [];

    if (!selectedUserName) {
      errors.push("Please enter a Username.");
    }

    if (!severity) {
      errors.push("Please select Severity.");
    }

    if (!comments) {
      errors.push("Please enter comments.");
    }

    if (errors.length > 0) {
      // Handle validation errors (if any) here
      // Enable the submit button before returning
      e.target.disabled = false;
      return;
    }

    const uID = localStorage.getItem("loginData");
    const usID = JSON.parse(uID);

    const data = {
      name: selectedUserName,
      severity: severity,
      comments: comments,
      specifiedDate: date,
    };

    try {
      const response = await addPerform(data);

      if (response.isRequestSuccessful === true) {
        toast.success("Performance Added");
        fetchPerformanceData();
        clear();
        handleClose(); // Close the modal
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session Expired!");
        navigate("/");
      } else {
        toast.error(error);
      }
    } finally {
      // Enable the submit button.
      e.target.disabled = false;
    }
  };

  const handleUpdatePerformance = async (e) => {
    e.preventDefault();
    const data = {
      performanceID: performanceID,
      severity: severity,
      comments: comments,
      specifiedDate: date,
    };
    try {
      await updatePerformance(data).then((response) => {
        if (response.isRequestSuccessful) {
          toast.success("Performance Updated Successfully");
          clear();
          handleUpdateClose();
          setCount(count + 1);
        } else {
          toast.error("Failed to Update Performance");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchData = async () => {
    try {
      console.log("first");
      const response = await getUsers();

      setIsChanged(isChanged + 1);
      setUsersNames(response);
      console.log("first");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShow = () => {
    fetchData();

    setShow(true);
  };

  const clear = () => {
    setSeverityType("");
    setComments("");
    setSelectedUserName(""); // Clear the selected user name
  };
  const showDetails = (data) => {
    setSeverityType(data.row.original.severity);
    setComments(data.row.original.comments);
    setDate(data.row.original.specifiedDate);
    setUpdateShow(true);
    setPerformanceID(data.row.original.id);
  };
  const showDetailss = (data) => {
    setSeverityType(data.row.original.severity);
    setComments(data.row.original.comments);
    setDate(data.row.original.specifiedDate);
    setDeleteShow(true);
    setPerformancesID(data.row.original.id);
  };

  useEffect(() => {
    fetchPerformanceData();
  }, [count]);

  const columns = [
    {
      header: "Employee Name",
      accessorKey: "employeeName",
    },
    {
      header: "Severity",
      accessorKey: "severity",
    },
    {
      header: "Comments",
      accessorKey: "comments",
    },
    {
      header: "Date",
      accessorKey: "specifiedDate",
    },
    {
      header: "Created Date",
      accessorKey: "date",
    },
    {
      header: "",
      accessorKey: " ",
      cell: (data) => (
        <Button
          className="action"
          variant="outline-secondary"
          onClick={() => showDetails(data)} // Call the showDetails function with the employee data
        >
          Update
        </Button>
      ),
    },
    {
      header: "",
      accessorKey: " ",
      cell: (data) => (
        <Button
          className="action"
          variant="outline-secondary"
          onClick={() => showDetailss(data)} // Call the showDetails function with the employee data
        >
          Delete
        </Button>
      ),
    },
  ];

  const data = useMemo(() => performanceData, [performanceData]);

  return (
    <div>
      <SideNavbar />
      <Profile />

      <div>
        <br />
        <br />
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add Performance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mt-3">
                <Col>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      User Name
                    </Form.Label>
                    <Form.Select
                      value={selectedUserName}
                      onChange={(e) => setSelectedUserName(e.target.value)}
                      required
                    >
                      <option value="">Select User</option>
                      {usersNames.map((user) => (
                        <option key={user.userName} value={user.userName}>
                          {user.userName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Severity</Form.Label>
                  <Form.Control
                    as="select"
                    value={severity}
                    onChange={(e) => setSeverityType(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Severity
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Severe">Severe</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    type="date"
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
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

        <Modal show={updateShow} onHide={handleUpdateClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Update Performance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdatePerformance}>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Severity</Form.Label>
                  <Form.Control
                    as="select"
                    value={severity}
                    onChange={(e) => setSeverityType(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Severity
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Severe">Severe</option>
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    type="date"
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit" className="addBtn">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={deleteshow} onHide={() => setDeleteShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Check-Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(event) => handleDelete(event)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="employeeList">
        <h2 className="headingListt">Employees Performance</h2>
        <Button
          variant="secondary"
          className="secondary-btn-btn"
          onClick={handleShow}
        >
          Add Review
        </Button>

        <GridTable data={data} columns={columns} minHeight={"300px"} />
      </div>
    </div>
  );
};

export default Performance;
