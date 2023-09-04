import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./AddEmployee.css"
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddEmployee = () => {
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
    
    clear();
    toast.success("User has been Added");
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
  return (
    <>
    <div><Form onSubmit={handleSubmit}>
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
            <option>Employee</option>
            <option>Admin</option>
            
          </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group className="mt-5" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" className='addBtn'>
        Submit
      </Button>
    </Form></div>
    </>
  )
}

export default AddEmployee