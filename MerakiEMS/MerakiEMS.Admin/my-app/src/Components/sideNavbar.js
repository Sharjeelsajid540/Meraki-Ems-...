"use client";
import React, { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../Components/Models/confirmationModal.js";
import { useRouter } from "next/navigation";

export default function () {
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem("LoginData")).userRole)
  // useMemo(() => {
  //   if (typeof window !== "undefined") {
  //     const roleData = localStorage.getItem("LoginData");
  //     if (roleData) {
  //       const parsedRoleData = JSON.parse(roleData);
  //       setUserRole(parsedRoleData);
  //       if (parsedRoleData.userRole === "Admin") {
  //         setUserRole("Admin");
  //       }
  //       else if (parsedRoleData.userRole === "User") {
  //         setUserRole("User");
  //       }
  //     }
  //   }
  // }, []);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    setConfirmationModal(true);
  };

  const handleModalClose = () => {
    setConfirmationModal(false);
  };

  const handleConfirmLogout = () => {
    // localStorage.clear();

    router.push("/", { scroll: false });

    handleModalClose();
  };

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
            <a href={userRole === "Admin" ? "/Admin/Home" : "/User/Home"} passHref className="no-underline">
              <div className="">
                <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left ">
                  <div className="a-text flex items-center text-white text-3xl p-2 rounded ml-2 gap-4">
                    <img
                      src="/dashboard.png"
                      alt="dashboard-Logo"
                      className=""
                    />
                    {userRole === "Admin" ? "Attendance List" : "Dashboard"}
                  </div>
                </div>
              </div>
            </a>

            <a href={userRole === "Admin" ? "/ShowLeavesAdmin" : "/Leaves"} passHref className="no-underline">
              <div>
                <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left">
                  <div className="a-text flex items-center text-white text-3xl p-2 rounded ml-2 gap-4">
                    <img
                      src="/calendar.png"
                      alt="dashboard-Logo"
                      className="mt-2"
                    />
                    {userRole === "Admin" ? "Leaves" : "Leaves"}
                  </div>
                </div>
              </div>
            </a>

            <a href="/Login" passHref className="no-underline">
              <div className="">
                <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left ">
                  <div className="a-text flex items-center text-white p-2 rounded ml-2 gap-1">
                    <img
                      src="/Profile.png"
                      alt="dashboard-Logo"
                      className="mt-2"
                    />
                    <span className="ml-3 text-3xl mt-2">Profile</span>
                  </div>
                </div>
              </div>
            </a>

            {userRole === "Admin" && (
              <a href="/Login" passHref className="no-underline">
                <div className="">
                  <div className="Profile w-full mt-8 hover:bg-custom-hover flex justify-left ">
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
              </a>
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
        open={confirmationModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}
