import React from 'react'
import ShowLeaves from './ShowLeavesAdmin'
import AddLeave from './AddLeave'
import { Profile } from './Profile';
import { SideNavbar } from './SideNavbar';
import "./css/Leave.css"
const Leave = () => {
    var role = localStorage.getItem('loginData');
   var roleData = JSON.parse(role);
    if (roleData.userRole == "Admin"){
      var UserRole = "Admin";
    }
    else{
       UserRole= "User";
    }
  

  return (
    <div>
        <SideNavbar/>
        <Profile/>
        <div className='addEmployee'>
        {UserRole == "Admin" ? <ShowLeaves/> : <AddLeave/>}
        </div>
    </div>
  )
}
export default Leave;