"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchUserImage } from "../../Apis/apis";

export default function NavBar() {
  const [userName, setUserName] = useState("");
  const [imagebase64, setImageBase64] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("LoginData");
    if (id) {
      const idData = JSON.parse(id);
      if (idData && idData.name) {
        setUserName(idData.name);
        fetchUserImage(idData.id)
          .then((response) => {
            setImageBase64(response.image);
          })
          .catch((error) => {
            console.error("Error fetching user image:", error);
          });
      }
    }
  }, []);

  return (
    <div className="flex items-center h-26 px-36 bg-navbar-color">
      <h2 className="flex justify-content-start mr-5">Welcome</h2>
      <div className="ml-auto flex items-center">
        <img
          src={
            imagebase64 && imagebase64 !== "" && imagebase64 !== "string"
              ? `data:image/jpeg;base64,${imagebase64}`
              : "/pexels-pixabay-220453.jpg"
          }
          className="h-[50px] rounded-[50px] w-[50px]"
        />

        <h1 className="text-2xl font-signature ml-5">
          <Link
            className="text-black text-4xl"
            href="/Login"
            target="_blank"
            rel="noreferrer"
          >
            {userName}
          </Link>
        </h1>
      </div>
    </div>
  );
}
