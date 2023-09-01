import React, { useState } from 'react';
import './Login.css'; // You can create this CSS file for additional styling
import Logo from "../images/logo-black.svg";
import Sidebar  from './Sidebar';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your authentication logic here using your .NET Core Web API
    // Send email and password to the backend for authentication
  };

  return (
    

    <div>
   
    <div className="login-container">
    <Sidebar />
     <div className="login-card">
        <img className="logo" src={Logo} alt=''/>
        
        <form onSubmit={handleLogin}>
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
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Log In
          </button>
        </form>
      </div>
     </div>
     </div>
   

  );
};

export default Login;
