import React, { useState } from 'react';
import Logo from "../images/logo-black.svg";
import { ForgotPassword } from '../Api/Api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from './Loader';
import Sidebar from './Sidebar';
import "./css/ResetPassword.css";     


export default function ForgetPasswordModal(props) {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      // Ensure ForgotPassword returns the expected response
      const response = await ForgotPassword(email);

      if (response.isRequestSuccessful) {
    
        props.closeForgetPasswordModal();
        toast.success(response.successMessage);
      } 
      else {
        toast.error(response.successMessage);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while resetting the password");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
    <div className="container">
      {/* <Sidebar /> */}
      <div className="modal-overlay">
        
        {loader && <Loader />}
        <div className="forget-modal forgrt-modal text-center">
          <span className="close-btn" onClick={props.closeForgetPasswordModal}>
            X
          </span>
          <div className="row justify-content-center">
            <div className="col-12">
              <img className="logo" src={Logo} alt="" />
            </div>
          </div>
          <h2>Reset Password</h2>
          <p>Please enter your email address</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='text d-flex' htmlFor="email">Email:</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button className="btn-custom" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
