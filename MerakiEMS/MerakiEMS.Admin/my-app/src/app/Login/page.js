"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../Apis/apis";
import Loader from "../../Components/Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (formData) => {
    localStorage.setItem("userName", formData.name);
    setLoader(true);
    loginUser(formData)
      .then((response) => {
        setLoader(false);
        if (response) {
          if (response.isSuccess) {
            toast.success(response.message, { id: "1" });
            if (response.userRole === "User") {
              router.push("/User", { scroll: false });
            } else {
              router.push("/Admin", { scroll: false });
            }
          } else {
            if (response.errors && response.errors.length > 0) {
              toast.error(response.errors[0]);
            } else {
              toast.error("An error occurred. Please try again!");
            }
          }
        } else {
          toast.error("Error occurred. Please try again!");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoader(false);
        toast.error("An error occurred. Please try again!");
      });
  };

  return (
    <>
      {loader && <Loader />}
      <ToastContainer />
      <div className="flex">
        <div className="bg-img w-1/2 h-screen flex items-center justify-center">
          <div className="flex items-center">
            <div className="mr-4">
              <img src="/Meraki-icon.png" alt="Meraki Logo" />
            </div>
            <div className="text-white text-8xl">
              <label>Meraki IT</label>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen flex items-center justify-center bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="text-center">
              <div className="flex items-center justify-center ">
                <img src="/Meraki-icon2.png" alt="Meraki Logo" />
              </div>

              <div className="text-5xl font-bold mt-10">
                <label htmlFor="text">Welcome</label>
              </div>
              <div className="text-4xl mb-6 mt-6">
                <label htmlFor="text">Enter Your Credentials to Login</label>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700  font-bold mb-2 text-2xl"
                htmlFor="Name"
              >
                Name
              </label>
              <input
                {...register("Name", { required: true })}
                id="Name"
                className="shadow appearance-none border rounded 4xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[40px]"
              />
              {errors.Name && (
                <span className="text-red-500 text-xs ">
                  This Name is required
                </span>
              )}
            </div>

            <div className="relative">
              <label
                className="block text-gray-700 text-2xl font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  rounded-lg h-[40px]"
              />
              <span
                className="absolute right-2 top-9 cursor-pointer mt-4"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
              </span>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  This Password is required
                </span>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="mb-10 text-right">
              <a href="/ForgotPassword" className="text-black-500 underline">
                Forgot Password?
              </a>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline bg-custom-blue hover:bg-custom-hover-blue rounded-lg h-[40px]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
