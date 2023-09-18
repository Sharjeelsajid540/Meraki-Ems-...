import React from 'react'
import "./Profile.css"
export const Profile = () => {
  const id = localStorage.getItem('loginData');
  var idData = JSON.parse(id);
  var userName = idData.name;
  return (
    <div className="profile">
    <h6 className="WelcomeBack">Welcome Back</h6>
    <h6 className="WelcomeBack2">{userName}</h6>
  </div>
  )
}
