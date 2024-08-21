"use client";
import React, { useEffect, useState } from "react";
import ConfirmationModal from "../Models/ConfirmationModal";
import { useRouter } from "next/navigation";

export default function Sidebar({
  handleAdminHome,
  handleAdminLeaves,
  handleAdminProfile,
  handleInterview,
  handleUserHome,
  handleUserLeaves,
  handleUserProfile,
}) {
  const [userRole, setUserRole] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAttendanceList = () => {
    if (userRole === "Admin") {
      handleAdminHome();
    } else {
      handleUserHome();
    }
  };

  const handleLeaves = () => {
    if (userRole === "Admin") {
      handleAdminLeaves();
    } else {
      handleUserLeaves();
    }
  };

  const handleProfile = () => {
    if (userRole === "Admin") {
      handleAdminProfile();
    } else {
      handleUserProfile();
    }
  };

  const handleInterviews = () => {
    handleInterview();
  };

  const handleLogout = () => {
    setConfirmationModal(true);
    setMessage("LogOut");
  };

  const handleModalClose = () => {
    setConfirmationModal(false);
  };

  const handleConfirmLogout = () => {
    router.push("/", { scroll: false });
    handleModalClose();
  };

  useEffect(() => {
    setUserRole(JSON.parse(localStorage.getItem("LoginData")).userRole);
  }, []);

  return (
    <>
      <div className="leftPanel h-screen w-1/6 bg-custom-blue flex flex-col justify-between ">
        <div className="mt-9">
          <div className="flex justify-center">
            <img
              src="/sideNAvebar-icon.png"
              alt="Meraki Logo"
              className="mt-10 mb-4"
            />
          </div>
          <div className="flex flex-col mt-20">
            <div
              onClick={handleAttendanceList}
              className="no-underline cursor-pointer"
            >
              <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left">
                <div className="a-text flex items-center text-white text-3xl p-2 rounded ml-2 gap-4">
                  <img src="/dashboard.png" alt="dashboard-Logo" className="" />
                  {userRole === "Admin" ? "Attendance List" : "Dashboard"}
                </div>
              </div>
            </div>

            <div onClick={handleLeaves} className="no-underline cursor-pointer">
              <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left">
                <div className="a-text flex items-center text-white text-3xl p-2 rounded ml-2 gap-4">
                  <img
                    src="/calendar.png"
                    alt="dashboard-Logo"
                    className="mt-2"
                  />
                  Leaves
                </div>
              </div>
            </div>

            <div
              onClick={handleProfile}
              className="no-underline cursor-pointer"
            >
              <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left">
                <div className="a-text flex items-center text-white text-3xl p-2 rounded ml-2 gap-4">
                  <img
                    src="/Profile.png"
                    alt="dashboard-Logo"
                    className="mt-2"
                  />
                  <span className="ml-3 text-3xl mt-2">Profile</span>
                </div>
              </div>
            </div>

            {userRole === "Admin" && (
              <div
                onClick={handleInterviews}
                className="no-underline cursor-pointer"
              >
                <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left">
                  <div className="a-text flex items-center text-white p-2 rounded ml-2 gap-1">
                    <img
                      src="/Profile.png"
                      alt="dashboard-Logo"
                      className="mt-2"
                    />
                    <span className="ml-3 text-3xl mt-2">Interviews</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <a passHref onClick={handleLogout} className="cursor-pointer">
            <div className="Profile mt-8 hover:bg-custom-hover flex justify-left">
              <div className="a-text flex items-center text-white p-2 rounded ml-2 gap-1">
                <img src="/logout.png" alt="logout-Logo" className="mt-2" />
                <span className="ml-3 text-3xl mt-2">Logout</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <ConfirmationModal
        msg={message}
        open={confirmationModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
