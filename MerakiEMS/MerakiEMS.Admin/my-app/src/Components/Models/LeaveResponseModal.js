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
  } = useForm();

  const onSubmit = (data) => {
    onConfirm(data.Status);
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 rounded-md">
        <div className="main-div">
          <div className="w-1/2">
            <h4 className="">Update Leave Response</h4>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <div className="mt-5">
              <label htmlFor="Status" className="block mb-2">
                Status
              </label>
              <select
                id="Status"
                {...register("Status", {
                  required: "Status",
                })}
                className={`py-3 border rounded-2xl w-full ${
                  errors.Status ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Ignored">Ignore</option>
              </select>
              {errors.Status && (
                <p className="text-red-500">{errors.Status.message}</p>
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
