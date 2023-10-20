import React, { useState } from "react";
import "./css/Login.css";
import Logo from "../images/logo-black.svg";
import Sidebar from "./Sidebar";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {LoginUser} from "../Api/Api";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
   const data={
      name: name,
      password: password
    }
    try {
      const result = await LoginUser(data);
      if (result.success)  {
        
        toast.success(result.message);
        navigate("/home");

        
      } else {
        toast.error(result.message);
      }

      
    } catch (error) {
      
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="login-container">
        <Sidebar />
        <div className="login-card">
          <img className="logo" src={Logo} alt="" />
          <h6>Enter your credentials to login</h6>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <FontAwesomeIcon
                  className="eye-icon"
                  onClick={togglePasswordVisibility}
                  icon={faEye}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-log">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
