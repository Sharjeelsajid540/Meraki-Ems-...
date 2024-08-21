"use client";
import React, { useState, useEffect } from "react";
import AdminHome from "../../Components/Admin/AdminHome";
import ShowLeavesAdmin from "../../Components/Admin/ShowLeavesAdmin";
import Profile from "../../Components/Common/Profile";
import SideNavbar from "../../Components/Common/SideNavbar";
import Interview from "../../Components/Admin/Interview";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Components/Common/Navbar";

export default function page() {
  const [showAdminHome, setShowAdminHome] = useState(false);
  const [showLeavesAdmin, setShowLeavesAdmin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);

  const handleAdminHome = () => {
    setShowAdminHome(true);
    setShowLeavesAdmin(false);
    setShowProfile(false);
    setShowInterview(false);
    setFunctionCalled(true);
  };

  const handleAdminLeaves = () => {
    setShowAdminHome(false);
    setShowLeavesAdmin(true);
    setShowProfile(false);
    setShowInterview(false);
    setFunctionCalled(true);
  };

  const handleAdminProfile = () => {
    setShowAdminHome(false);
    setShowLeavesAdmin(false);
    setShowProfile(true);
    setShowInterview(false);
    setFunctionCalled(true);
  };

  const handleInterview = () => {
    setShowAdminHome(false);
    setShowLeavesAdmin(false);
    setShowProfile(false);
    setShowInterview(true);
    setFunctionCalled(true);
  };

  useEffect(() => {
    if (!functionCalled) {
      setShowAdminHome(true);
    }
  }, [functionCalled]);

  return (
    <div>
      <ToastContainer />
      <div className="flex">
        <SideNavbar
          handleAdminHome={handleAdminHome}
          handleAdminLeaves={handleAdminLeaves}
          handleAdminProfile={handleAdminProfile}
          handleInterview={handleInterview}
        />
        <div className="w-5/6">
          <Navbar />
          {showAdminHome && <AdminHome />}
          {showLeavesAdmin && <ShowLeavesAdmin />}
          {showProfile && <Profile />}
          {showInterview && <Interview />}
        </div>
      </div>
    </div>
  );
}
