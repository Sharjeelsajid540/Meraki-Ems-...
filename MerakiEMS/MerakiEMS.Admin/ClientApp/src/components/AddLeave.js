import React, { useEffect } from 'react'
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
import { Profile } from './Profile';
import { SideNavbar } from './SideNavbar';
import "./AddLeave.css"



const AddLeave = () => {

const[userID, setuserID]=useState('');
const[id, setid]=useState('');
const[to, setTo]=useState('');
    const[from, setFrom]=useState('');
    const[description, setDescription]=useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const uID = localStorage.getItem('loginData');
        const usID = JSON.parse(uID);
        console.log(usID.id);
        const data={
            
            userID:usID.id,
            from:from,
            to:to,
            description:description
           
        };
        
           
      
const response = await axios.post("https://localhost:7206/api/User/AddLeave",data)
.then((result) => {
    
    if (result.data.isRequestSuccessful === true){
      
      toast.success("Request has been Added");
      clear();
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
        
        setFrom("");
        setTo("");
        setDescription("");
      };
      useEffect(() => {
        // getRoles();
      }, []);
    //   const getRoles = ()=>{
    //     axios.get("https://localhost:7206/api/User/UserRole")
    //     .then((result)=>{
    //       localStorage.setItem('RolesData', JSON.stringify(result.data));
    //     })
    //   }
      // const getRoleNamesFromLocalStorage = () => {
      //   const uID = localStorage.getItem('attendList');
        
      //   return uID ? JSON.parse(uID.userID) : [];
        
         
      // };

     
    //   useEffect(() => {
        
    //     const storedRoleNames = getRoleNamesFromLocalStorage();
    //     setRoleNames(storedRoleNames);
        
    //   }, []);
  return (
    <>

<div className="CustomerPage">
       <SideNavbar/>
      <Profile/>
        <div className="addEmployee">
        <Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>From (Date)</Form.Label>
          <Form.Control type="name" placeholder="Enter From Date" value={from} onChange={(e)=> setFrom(e.target.value)} required />
        </Form.Group>
        </Row>
        <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>To (Date)</Form.Label>
          <Form.Control type="name" placeholder="Enter To Date" value={to} onChange={(e)=> setTo(e.target.value)} required />
        </Form.Group>
        </Row>

        <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control type="name" placeholder="Enter Description" value={description} onChange={(e)=> setDescription(e.target.value)} required />
        </Form.Group>
        </Row>
      <Form.Group className="mt-5" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" className='addBtn'>
        Submit
      </Button>
    </Form>
          
        </div>
      </div>





    {/* <div className='Add-leave-div'>
      <div className='left-div'>
        <SideNavbar/>
      </div>
<div className='right-div'>
    <Profile/>
    <div className="container">
      <Form onSubmit={handleSubmit}>
      <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>From (Date)</Form.Label>
          <Form.Control type="name" placeholder="Enter From Date" value={from} onChange={(e)=> setFrom(e.target.value)} required />
        </Form.Group>
        </Row>
        <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>To (Date)</Form.Label>
          <Form.Control type="name" placeholder="Enter To Date" value={to} onChange={(e)=> setTo(e.target.value)} required />
        </Form.Group>
        </Row>

        <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control type="name" placeholder="Enter Description" value={description} onChange={(e)=> setDescription(e.target.value)} required />
        </Form.Group>
        </Row>
      <Form.Group className="mt-5" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" className='addBtn'>
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </div> */}
    </>
  )
}

export default AddLeave;