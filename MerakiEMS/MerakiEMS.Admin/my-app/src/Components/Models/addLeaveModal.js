import React from "react";
import { Modal } from "react-responsive-modal";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-responsive-modal/styles.css";
import "react-datepicker/dist/react-datepicker.css";

export default function ({ open, onClose, onConfirm }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onConfirm(data);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 rounded-md">
        <div className="main-div">
          <div className="w-1/2">
            <h4 className="">Add Leave Request</h4>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <div className="mt-5">
              <label htmlFor="leaveType" className="block mb-2">
                Leave Type
              </label>
              <select
                id="leaveType"
                {...register("leaveType", {
                  required: "Leave type is required",
                })}
                className={`py-3 border rounded-2xl w-full ${
                  errors.leaveType ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Leave Type</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="vacation">Vacation Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="paternity">Paternity Leave</option>
              </select>
              {errors.leaveType && (
                <p className="text-red-500">{errors.leaveType.message}</p>
              )}
            </div>
            <div className="flex gap-x-24 ">
              <div>
                <label htmlFor="fromDate" className="block mb-2">
                  From
                </label>
                <Controller
                  name="from"
                  control={control}
                  rules={{ required: "From date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select Date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className={`py-3 px-2 border rounded-2xl w-96 ${
                        errors.fromDate ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.fromDate && (
                  <p className="text-red-500">{errors.fromDate.message}</p>
                )}
              </div>

              <div className="">
                <label htmlFor="toDate" className="block mb-2">
                  To
                </label>
                <Controller
                  name="to"
                  control={control}
                  rules={{ required: "To date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Select Date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className={`py-3 px-2 border rounded-2xl w-96 ${
                        errors.toDate ? "border-red-500" : ""
                      }`}
                    />
                  )}
                />
                {errors.toDate && (
                  <p className="text-red-500">{errors.toDate.message}</p>
                )}
              </div>
            </div>
            <div className="">
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                rows="5"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`py-3 px-2 border rounded-2xl w-full ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-custom-blue text-white font-bold rounded hover:bg-custom-hover rounded-2xl"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
