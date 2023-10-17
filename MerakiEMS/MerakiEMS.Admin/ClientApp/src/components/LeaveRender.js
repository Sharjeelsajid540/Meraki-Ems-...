import React from "react";
import ShowLeaves from "./ShowLeavesAdmin";
import AddLeave from "./AddLeave";
import { Profile } from "./Profile";
import { SideNavbar } from "./SideNavbar";

const Leave = () => {
  var role = localStorage.getItem("loginData");
  var roleData = JSON.parse(role);
  if (roleData.userRole == "Admin") {
    var UserRole = "Admin";
  } else {
    UserRole = "User";
  }

  return (
    <div>
      <SideNavbar />
      <Profile />

      {UserRole == "Admin" ? <ShowLeaves /> : <AddLeave />}
    </div>
  );
};
export default Leave;
