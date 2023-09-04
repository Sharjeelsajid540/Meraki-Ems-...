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
    const[userRole, setUserRole]=useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data={
            name,
            password,
            userRole,
        };
        if (e.userRole === "Admin"){
            data.userRole=1;
        }
        else{
            data.userRole=2;
        }
      
axios.post("https://localhost:7206/api/User/AddUser",data)
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
        setUserRole("");
      };
  return (
    <>
    <div><Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} required />
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
          <Form.Select defaultValue="Choose Role..." value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required>
            <option>Choose...</option>
            <option>Admin</option>
            <option>Employee</option>
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