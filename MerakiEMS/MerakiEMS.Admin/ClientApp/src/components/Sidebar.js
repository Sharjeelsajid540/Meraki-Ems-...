import React from 'react';
import './Sidebar.css';
import Logo from "../images/logo-black.svg";

function Sidebar() {
  return (
    <div className="sidebar">
        <img className='side-logo' src={Logo} alt=''/>
    </div>
  );
}

export default Sidebar;
