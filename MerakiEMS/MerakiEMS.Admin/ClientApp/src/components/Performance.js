import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { GridTable } from './GridTable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { SideNavbar } from './SideNavbar';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { Profile } from './Profile';
import './css/Performance.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [severity, setSeverityType] = useState(''); // Initialize as an empty string
  const [comments, setComments] = useState(''); // Initialize as an empty string
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedUserName, setSelectedUserName] = useState(''); // Selected user name
  const [usersNames, setUsersNames] = useState([]);
  const [isChanged, setIsChanged] = useState(0);

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch('https://localhost:7206/api/User/GetPerformance');
      const data = await response.json();
      setPerformanceData(data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const navigate = useNavigate();
  const refreshShowLeavesUser = () => {
    fetchPerformanceData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uID = localStorage.getItem('loginData');
    const usID = JSON.parse(uID);

    const data = {
      name: selectedUserName, // Use the selectedUserName state
      severity: severity,
      comments: comments,
    };

    try {
      const response = await axios.post('https://localhost:7206/api/User/AddPerform', data);

      if (response.data.isRequestSuccessful === true) {
        toast.success('Performance Added');
        refreshShowLeavesUser();
        clear();
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Session Expired!');
        navigate('/');
      } else {
        toast.error(error);
      }
    }
  };

  const getUsers = async () => {
    await axios.get('https://localhost:7206/api/User/UserList').then((result) => {
      localStorage.setItem('UsersData', JSON.stringify(result.data));
      setIsChanged(isChanged + 1);
    });
  };

  const getUsersNamesFromLocalStorage = () => {
    const usersNames = localStorage.getItem('UsersData');

    return usersNames ? JSON.parse(usersNames) : [];
  };

  const handleShow = () => {
    const storedUsersNames = getUsersNamesFromLocalStorage();
    setUsersNames(storedUsersNames);
    setShow(true);
  };

  const clear = () => {
    setSeverityType('');
    setComments('');
    setSelectedUserName(''); // Clear the selected user name
  };

  useEffect(() => {
    fetchPerformanceData();
    getUsers();
  }, []);

  const columns = [
    {
      header: 'Employee Name',
      accessorKey: 'employeeName',
    },
    {
      header: 'Severity',
      accessorKey: 'severity',
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Comments',
      accessorKey: 'comments',
      
    },
  ];

  const data = useMemo(() => performanceData, [performanceData]);

  return (
    <div>
      <SideNavbar />
      <Profile />
      <div className="addEmployee">
        <Button
          variant="secondary"
          className="secondary-btn"
          onClick={handleShow}
        >
          Add Comments
        </Button>
        <br />
        <br />
        <Modal show={show} onHide={handleClose}>
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
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Severe">Severe</option>
                  </Form.Control>
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
      <Button variant="primary" type="submit" className='addBtn' onClick={handleClose}>
        Submit
      </Button>
    </Form>
    </Modal.Body>
    </Modal>
    </div>
    <div className='employeeList'>
      <h2 className="headingList">Employees Performance</h2>
      <GridTable data={data} columns={columns} minHeight={'300px'} />
    </div>
  </div>
  );
};

export default Performance;
