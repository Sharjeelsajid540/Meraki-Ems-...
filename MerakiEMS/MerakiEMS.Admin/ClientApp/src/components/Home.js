import React from 'react';
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

import "react-toastify/dist/ReactToastify.css";
import AppComp from './AppComp';

function Home() {

   var role = localStorage.getItem('loginData');
   var roleData = JSON.parse(role);
   console.log(roleData.userRole)
    if (roleData.userRole == "Admin"){
      var UserRole = "Admin";
    }
    else{
      var UserRole= "User";
    }
  
  return (
    <>
    <div className="CustomerPage">
        <div className="leftPanel">
          <img className="logo-image2" src={Logo} alt="Logo" />
          <div className="left-menu">
            <NavLink
              className="menu-links"
              activeclassname="is-active"
              exact="true"
              to="/home"
            >
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faUser}
                  size="xs"
                  className="menu-icons"
                />{UserRole=="Admin"?"Employees":"Dashboard"}
                
              </h5>
            </NavLink>
            <NavLink className="menu-links" to="#">
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faCalendarXmark}
                  size="xs"
                  className="menu-icons"
                />
               {UserRole=="Admin"?"Leaves":"Apply Leave"}
              </h5>
            </NavLink>
            <NavLink className="menu-links" to="#">
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faTicketSimple}
                  size="xs"
                  className="menu-icons"
                />
               {UserRole=="Admin"?"Raise Ticket":"Tickets"}
              </h5>
            </NavLink>
            <NavLink className="menu-links" to="#">
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faFilePen}
                  size="xs"
                  className="menu-icons"
                />
                {UserRole=="Admin"?"FeedBack":"Give FeedBack"}
              </h5>
            </NavLink>
            
            
           
          </div>
          <div className='logout'>
          <NavLink className="menu-links menu-logout" to="/login">
            
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size="xs"
                  className="menu-icons"
                />
                Logout
              </h5>
             
            </NavLink>
            </div>
        </div>
        <div className="profile">
          <h6 className="WelcomeBack">Welcome Back</h6>
        </div>
        <div className="addEmployee">
        {UserRole=="Admin"?<AddEmployee />:<AppComp/>}
          
        </div>
      </div>
    </>
  );
}



export default Home;
