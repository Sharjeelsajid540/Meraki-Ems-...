import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; // You can create this CSS file for custom styling
import Logo from '../images/logo-black.svg';

function Home() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img
              src={Logo} // Replace with your company logo image source
              alt="Company Logo"
              className="logo"
            />
          </a>

          {/* Buttons */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn-h btn-light">Home</button>
            </li>
            <li className="nav-item">
              <button className="btn-h btn-light">About</button>
            </li>
            <li className="nav-item">
              <button className="btn-h btn-light">Services</button>
            </li>
            <li className="nav-item">
              <button className="btn-h btn-contact" >
               Contact Us
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Your content goes here */}
      <div className="container mt-4">
        <h1>Welcome to Our Website</h1>
        {/* Add the rest of your content here */}
      </div>
    </div>
  );
}



export default Home;
