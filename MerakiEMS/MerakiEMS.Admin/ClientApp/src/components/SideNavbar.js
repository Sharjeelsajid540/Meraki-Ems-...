import React from 'react'
import Logo from '../images/logo-black.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Home.css';
import './SideNavbar.css'; // You can create this CSS file for custom styling
import {
  faUser,
  
  faTicketSimple,
  faFilePen,
  faRightFromBracket,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
export const SideNavbar = () => {
    var role = localStorage.getItem('loginData');
    var roleData = JSON.parse(role);
     if (roleData.userRole == "Admin"){
       var UserRole = "Admin";
     }
     else{
        UserRole= "User";
     }

    //  const clickedStyle = {
    //     textDecoration: 'none',
    //     color: 'white',
    //     //background: '#0B2B50',
    //   };
    
    //   const unclickedStyle = {
    //     textDecoration: 'none',
    //     // color: '#0B2B50',
    //     background: 'white',
    //   };
  return (
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
            
        
            
            <NavLink className="menu-links" to="/leaves" activeclassname="is-active">
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faCalendarXmark}
                  size="xs"
                  className="menu-icons"
                />
              
              {UserRole === "Admin" ? "Leaves" : "Add Leave"}
      
              </h5>
            </NavLink>
            <NavLink className="menu-links" to="/tickets">
              <h5 className="link-text">
                <FontAwesomeIcon
                  icon={faTicketSimple}
                  size="xs"
                  className="menu-icons"
                />
               {UserRole=="Admin"?"Raise Ticket":"Tickets"}
              </h5>
            </NavLink>
            <NavLink className="menu-links" to="/feedback">
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
  )
}
