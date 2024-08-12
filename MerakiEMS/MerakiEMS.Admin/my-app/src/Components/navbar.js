"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchUserImage } from "../../Apis/apis";

export default function NavBar() {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("LoginData");
    if (id) {
      const idData = JSON.parse(id)
        ;
      if (idData && idData.name) {
        setUserName(idData.name);
        fetchUserImage(idData.id)
          .then((response) => {
            console.log("response", response);
            setUserImage(response.image);
          })
          .catch((error) => {
            console.error("Error fetching user image:", error);
          });
      }
    }
  }, []);



  return (
    <div className="flex items-center h-26 px-36 bg-navbar-color">
      <h2 className="flex justify-content-start mr-5 ml-Welcome-text">Welcome</h2>
      <div className="ml-auto flex items-center space-x-4 mr-UserName-text">
        <img
          src={
            userImage && userImage !== "" && userImage !== "string"
              ? `data:image/jpeg;base64,${userImage}`
              : "/Ellipse 8.png"
          }
          className="h-[50px] w-[50px]"
        />
        <h1 className="text-2xl font-signature">
          <span className="text-black text-4xl">
            {userName}
          </span>
        </h1>
      </div>

    </div>
  );
}
