import React, { useEffect, useState } from "react";
import { SideNavbar } from "./SideNavbar";
import { Profile } from "./Profile";
import "./css/UserProfile.css";
import { fetchUserData } from "../Api/Api";

const UserProfile = () => {
  const [userData, setUserData] = useState("");
  const id = localStorage.getItem("loginData");
  var idData = JSON.parse(id);

  useEffect(() => {
    var id = idData.id;
    fetchUserData(id).then((result) => {
      if (result) {
        setUserData(result);
      }
    });
  }, []);
  return (
    <>
      <div>
        <SideNavbar />
        <Profile />
        <div className="userProfile">
          <div className="userProfile2">
            <h2>User Profile</h2>
            <div className="userDetails">
              <div className="userImage">
                {userData.image && (
                  <img
                    src={`data:image/jpeg;base64,${userData.image}`}
                    alt="User's Profile"
                    className="profileImage"
                  />
                )}
              </div>
              <div className="Details">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
