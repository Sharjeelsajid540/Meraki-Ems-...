import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./css/AddEmployee.css"
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersList from './UsersList';
import Modal from 'react-bootstrap/Modal';



const AddEmployee = () => {
  const [roleNames, setRoleNames] = useState([]);
    const[name, setName]=useState('');
    const[password, setPassword]=useState('');
    const[roleID, setRoleID]=useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data={
            name,
            password,
            roleID,
        };
        
        if (roleID === "Admin"){
            data.roleID=1;
        }
        else{
            data.roleID=2;
        }
      
      
const response = await axios.post("https://localhost:7206/api/User/AddUser",data)
.then((result) => {
    
    if (result.data.isRequestSuccessful === true){
      clear();
      toast.success("User has been Added");
    }
    else{
      toast.error(result.data.successResponse)
    }
  })
  .catch((error) => {
    if (error.response.status === 401) {
      toast.error("Session Expired!");
      
      navigate("/");
    } else {
      toast.error(error);
    }
  });
    }

    const clear = () => {
        setName("");
        setPassword("");
        setRoleID("");
      };
      useEffect(() => {
        getRoles();
      }, []);
      const getRoles = ()=>{
        axios.get("https://localhost:7206/api/User/UserRole")
        .then((result)=>{
          localStorage.setItem('RolesData', JSON.stringify(result.data));
        })
      }
      const getRoleNamesFromLocalStorage = () => {
        const roleNames = localStorage.getItem('RolesData');
        
        return roleNames ? JSON.parse(roleNames) : [];
        
         
      };

      useEffect(() => {
        
        const storedRoleNames = getRoleNamesFromLocalStorage();
        setRoleNames(storedRoleNames);
        
      }, []);

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
     
      
  return (
    
    <div className="CustomerPage">
       
      
       <Button variant="secondary" className='secondary-btn' onClick={handleShow}>Add Role</Button>{' '}
       <UsersList />  
       <br/>
    <div className="addEmployee">
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} required />
        </Form.Group>
        </Row>
        <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
        </Form.Group>
      </Row>
      <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Role</Form.Label>
          <Form.Select  value={roleID}
              onChange={(e) => setRoleID(e.target.value)}
              required>
            {roleNames.map((role) => (
            <option key={role.id}>{role.roleName}</option>
          ))}
            
          </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group className="mt-5" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" className='addBtn'>
        Submit
      </Button>
    </Form>
    </Modal.Body>
    {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

    </div>
    </div>
    //  
  )
}

export default AddEmployee;