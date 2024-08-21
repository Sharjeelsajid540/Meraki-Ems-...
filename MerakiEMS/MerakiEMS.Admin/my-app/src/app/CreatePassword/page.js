"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateNewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmit = (data) => {};

  return (
    <div className="flex">
      <div className="bg-img w-1/2 h-screen flex items-center justify-center">
        <div className="flex items-center">
          <div className="mr-4">
            <img src="/Meraki-icon.png" alt="Meraki Logo" />
          </div>
          <div className="text-white text-6xl font-bold">
            <label>Meraki IT</label>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-screen flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="text-center">
            <div className="flex items-center justify-center ">
              <img src="/Meraki-icon2.png" alt="Meraki Logo" />
            </div>

            <div className="text-3xl font-bold mt-10">
              <label htmlFor="text">Enter New Password</label>
            </div>
            <div className="mb-10">
              <label htmlFor="text">
                Enter the details to change your password
              </label>
            </div>
          </div>
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              {...register("password", { required: true })}
              type={showNewPassword ? "text" : "password"}
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
            </span>
            {errors.password && (
              <span className="text-red-500 text-xs ">
                This field is required
              </span>
            )}
          </div>

          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              {...register("password", { required: true })}
              type={showConfirmPassword ? "text" : "password"}
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span
              className="absolute right-2 top-9 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
            </span>
            {errors.password && (
              <span className="text-red-500 text-xs ">
                This field is required
              </span>
            )}
          </div>

          <div className=" mt-10 flex items-center justify-between">
            <button
              type="submit"
              className="text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#0B2B50" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
