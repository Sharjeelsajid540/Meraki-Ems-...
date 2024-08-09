import React, { useEffect, useState, useRouter} from 'react';
import Logo from "../images/logo-black.svg";
import {useLocation} from "react-router-dom";
import { ResetPass } from '../Api/Api';
import "./css/ResetPassword.css";
import Sidebar from "./Sidebar";




const ResetPassword = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const search = useLocation().search;
const tokenParam = new URLSearchParams(search).get('token');
const token = tokenParam ? decodeURIComponent(tokenParam) : null;

  const [resetSuccess, setResetSuccess] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   // Access the query parameters
  //   const { token } = router.query;

  //   // Now, myParam contains the value of the 'myParam' query parameter
  //   // console.log('Value of myParam:', token);
  // }, [router.query])
  
  useEffect(()=>{
    // console.log("Token : ", token)
  },[token])
  const Reset = async (e) => {
 
    e.preventDefault();

    try {
  const data = {
    resetToken: token,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
// console.log("Data : ",data)
  const response = await ResetPass(data);

  if (response !== null) {
    if (newPassword !== confirmPassword) {
      // Handle password mismatch
      alert("Passwords do not match. Please try again.");
    } else {
      // Password reset successful
      setResetSuccess(true);

      // Redirect to login page after a delay
      setTimeout(() => {
        setResetSuccess(false);
        setNewPassword('');
        setConfirmPassword('');
        window.location.href = '/login'; // Replace '/login' with the actual path to your login page
      }, 3000);
    }
  } else {
    // Handle API error
    alert("Password reset failed. Please try again.");
  }
} catch (error) {
  console.error("Error resetting password:", error);
  alert("An unexpected error occurred. Please try again later.");
}

  };

  return (
    <div className="sidebar">
      <Sidebar />
    <div className="modal-overlay">
      <div className="forget-modal forgrt-modal text-center">
        <div className="row justify-content-center">
          <div className="col-12">
            <img className="logo" src={Logo} alt="" />
          </div>
        </div>
        <h2>Reset Password</h2>
        {resetSuccess && <p>Password reset successful!</p>}
        {!resetSuccess && (
          <>
            <p>Please enter your new password</p>
            <form onSubmit={Reset}>
              <div className="form-group">
                <label className='text d-flex' htmlFor="newPassword">New Password:</label>
                <div className="password-input">
                  <input
                    className="form-control"
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label className='text d-flex' htmlFor="confirmPassword">Confirm Password:</label>
                <div className="password-input">
                  <input
                    className="form-control"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
              </div>
              <button className="btn-custom" type="submit">
                Reset Password
              </button>
            </form>
            
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
