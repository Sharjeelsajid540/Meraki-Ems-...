"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import SideNavbar from "../../Components/sideNavbar";
import Loader from "../../Components/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserData } from "../../../Apis/apis";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const ids = localStorage.getItem("LoginData");
    var idData = JSON.parse(ids);
    var id = idData.id;
    fetchUserData(id).then((result) => {
      if (result) {
        setUserData(result);
      }
    });
  }, []);

  return (
    <>
      {loader && <Loader />}
      <ToastContainer />

      <div className="flex">
        <SideNavbar />
        <div className="w-4/5">
          <Navbar />
          <div className="flex justify-center mt-20 ">
            <div className="bg-gray-100 p-5 rounded-lg shadow-lg text-center ">
              <h2>User Profile</h2>
              <div className="flex p-5 bg-white rounded-md shadow-md mt-5 text-left text-[1.2rem] flex flex-row gap-[80px]">
                <div className="text-4xl ">
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone No:</strong> {userData.contactNo}
                  </p>
                  <p>
                    <strong>Emergency Phone No:</strong> {userData.eContactNo}
                  </p>
                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                  <p>
                    <strong>CNIC No:</strong> {userData.cnic}
                  </p>
                  <p>
                    <strong>Manager:</strong> {userData.manager}
                  </p>
                  <p>
                    <strong>Role:</strong> {userData.role}
                  </p>
                </div>
                <div className="">
                  <img
                    src={
                      userData.image &&
                      userData.image !== "" &&
                      userData.image !== "string"
                        ? `data:image/jpeg;base64,${userData.image}`
                        : "/pexels-pixabay-220453.jpg"
                    }
                    alt="User's Profile"
                    className="h-[300px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
