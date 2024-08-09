import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import AddEmployee from "./AddEmployee";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AttendanceList from "./AttendanceList";
import { Profile } from "./Profile";
import { SideNavbar } from "./SideNavbar";
import {  useEffect } from "react";

function Home() {
  var role = localStorage.getItem("loginData");
  var roleData = JSON.parse(role);
  if (roleData.userRole == "Admin") {
    var UserRole = "Admin";
  } else {
    var UserRole = "User";
  }
  
 


 

  return (
    <>
      <div className="CustomerPage">
        <SideNavbar />
        <Profile />

        {UserRole == "Admin" ?   <AddEmployee /> : <AttendanceList />}
      </div>
    </>
  );
}

export default Home;
