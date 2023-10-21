import React from "react";
import Logo from "../images/logo-black.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Home.css";
import "./css/SideNavbar.css";
import {
  faUser,
  faTicketSimple,
  faFilePen,
  faRightFromBracket,
  faCalendarXmark,
  faM,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export const SideNavbar = () => {
  var role = localStorage.getItem("loginData");
  var roleData = JSON.parse(role);
  if (roleData.userRole === "Admin") {
    var UserRole = "Admin";
  } else {
    UserRole = "User";
  }

  const handleLogout = () => {
    localStorage.clear();
  };
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
            <FontAwesomeIcon icon={faM} size="xs" className="menu-icons" flip />
            {UserRole === "Admin" ? "Attendance List" : "Dashboard"}
          </h5>
        </NavLink>

        <NavLink
          className="menu-links"
          to={"/leaves"}
          activeclassname="is-active"
        >
          <h5 className="link-text">
            <FontAwesomeIcon
              icon={faCalendarXmark}
              size="xs"
              className="menu-icons"
            />

            {UserRole === "Admin" ? "Leaves" : "Leaves"}
          </h5>
        </NavLink>
        {UserRole === "Admin" && (
  <NavLink className="menu-links" to="/perform">
    <h5 className="link-text">
      <FontAwesomeIcon icon={faTicketSimple} size="xs" className="menu-icons" />
      Performance
    </h5>
  </NavLink>
)}

        {/* <NavLink
          className="menu-links"
          to={"/home"}
          // to={UserRole === "Admin" ? "/tickets/admin" : "/tickets"}
        >
          <h5 className="link-text">
            <FontAwesomeIcon
              icon={faTicketSimple}
              size="xs"
              className="menu-icons"
            />
            {UserRole === "Admin" ? "Tickets" : "Raise Ticket"}
          </h5>
        </NavLink> */}
        {/*<NavLink className="menu-links" to="/feedback">
          <h5 className="link-text">
            <FontAwesomeIcon
              icon={faFilePen}
              size="xs"
              className="menu-icons"
            />
            {UserRole === "Admin" ? "Feedback" : "Give Feedback"}
          </h5>
        </NavLink> */}
        {/* <NavLink
          className="menu-links"
          to={"/home"}
          // to={UserRole === "Admin" ? "/employees" : "/profile"}
        >
          <h5 className="link-text">
            <FontAwesomeIcon icon={faUser} size="xs" className="menu-icons" />
            {UserRole === "Admin" ? "Employees" : "Profile"}
          </h5>
        </NavLink> */}
      </div>
      <div className="logout">
        <NavLink
          className="menu-links menu-logout"
          to="/login"
          onClick={handleLogout}
        >
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
  );
};
