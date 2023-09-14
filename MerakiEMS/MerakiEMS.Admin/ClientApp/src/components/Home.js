
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; // You can create this CSS file for custom styling
import Logo from '../images/logo-black.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  
  faTicketSimple,
  faFilePen,
  faRightFromBracket,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import AddEmployee from './AddEmployee';
import AddLeave from './AddLeave';
import React, { useState} from 'react';
import { withRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import AttendanceList from './AttendanceList';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Profile } from './Profile';
import { SideNavbar } from './SideNavbar';
function Home() {
   var role = localStorage.getItem('loginData');
   var roleData = JSON.parse(role);
    if (roleData.userRole == "Admin"){
      var UserRole = "Admin";
    }
    else{
      var UserRole= "User";
    }
  
  return (
    <>
    <div className="CustomerPage">
       <SideNavbar/>
      <Profile/>
        <div className="addEmployee">
        {UserRole=="Admin"?<AddEmployee />:<AttendanceList/>}
          
        </div>
      </div>
    </>
  );
}



export default Home;
