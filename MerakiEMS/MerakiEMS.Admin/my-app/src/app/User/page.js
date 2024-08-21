"use client";
import React, { useState, useEffect } from "react";
import SideNavbar from "../../Components/Common/SideNavbar";
import { ToastContainer, toast } from "react-toastify";
import UserHome from "../../Components/User/UserHome";
import ShowLeavesUser from "../../Components/User/ShowLeavesUser";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../../Components/Common/Profile";
import Navbar from "../../Components/Common/Navbar";

export default function page() {
  const [showUserHome, setShowUserHome] = useState(false);
  const [showUserLeaves, setShowUserLeaves] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);

  const handleUserHome = () => {
    setShowUserHome(true);
    setShowUserLeaves(false);
    setShowProfile(false);
    setFunctionCalled(true);
  };

  const handleUserLeaves = () => {
    setShowUserHome(false);
    setShowUserLeaves(true);
    setShowProfile(false);
    setFunctionCalled(true);
  };

  const handleUserProfile = () => {
    setShowUserHome(false);
    setShowUserLeaves(false);
    setShowProfile(true);
    setFunctionCalled(true);
  };

  useEffect(() => {
    if (!functionCalled) {
      setShowUserHome(true);
    }
  }, [functionCalled]);

  return (
    <div>
      <ToastContainer />
      <div className="flex">
        <SideNavbar
          handleUserHome={handleUserHome}
          handleUserLeaves={handleUserLeaves}
          handleUserProfile={handleUserProfile}
        />
        <div className="w-full">
          <Navbar />
          {showUserHome && <UserHome />}
          {showUserLeaves && <ShowLeavesUser />}
          {showProfile && <Profile />}
        </div>
      </div>
    </div>
  );
}
