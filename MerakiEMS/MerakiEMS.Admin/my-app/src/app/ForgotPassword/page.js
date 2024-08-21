"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            <div className="flex items-center justify-center">
              <img src="/Meraki-icon2.png" alt="Meraki Logo" />
            </div>

            <div className="text-3xl font-bold mt-10">
              <label htmlFor="reset-password">Reset Your Password</label>
            </div>
            <div className="mb-10">
              <label htmlFor="reset-instructions">
                Please enter registered email to reset your password
              </label>
            </div>
          </div>

          <div className="mb-10 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <span className="text-red-500 text-xs ">
                This email is required
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
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
