import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import { GridTable } from "./gridTable";
import "react-responsive-modal/styles.css";
import "tailwindcss/tailwind.css"; // Ensure you have Tailwind CSS included in your project
export default function AttendanceList({
  data,
  columns,
  fineCount,
  handleCheckIn,
  handleCheckOut,
  hasCheckedIn,
  hasCheckedOut,
  confirmCheckIn,
  confirmCheckOut,
}) {
  const { handleSubmit, reset } = useForm();
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);

  const onSubmitCheckIn = () => {
    confirmCheckIn();
    setShowCheckInModal(false);
    reset();
  };

  const onSubmitCheckOut = () => {
    confirmCheckOut();
    setShowCheckOutModal(false);
    reset();
  };

  return (
    <>
      <div className="attendanceList absolute mt-40 w-3/4 mx-auto">
        <div className="containerr mt-10">
          <div className="row flex">
            <div className="col-md-6 w-1/2">
              <div>
                <h2 className="text-2xl">Check-In</h2>
                <button
                  className={`btn btn-1 ${hasCheckedIn ? "btn-clicked" : ""} ${
                    hasCheckedIn ? "bg-green-500" : "bg-blue-500"
                  } text-white py-2 px-4 rounded`}
                  onClick={() => setShowCheckInModal(true)}
                  disabled={hasCheckedIn}
                >
                  {hasCheckedIn ? "Checked IN ✓" : "CheckIn"}
                </button>
              </div>
            </div>
            <div className="col-md-6 w-1/2">
              <div>
                <h2 className="text-2xl">Check-Out</h2>
                <button
                  className={`btn btn-1 ${hasCheckedOut ? "btn-clicked" : ""} ${
                    hasCheckedOut ? "bg-green-500" : "bg-blue-500"
                  } text-white py-2 px-4 rounded`}
                  onClick={() => setShowCheckOutModal(true)}
                  disabled={hasCheckedOut}
                >
                  {hasCheckedOut ? "Checked Out ✓" : "CheckOut"}
                </button>
              </div>
            </div>
          </div>
          <div className="row flex mt-4">
            <div className="col-md-12 w-full">
              <div className="title-container mb-4">
                <h2 className="late-heading text-2xl">Employee Attendance</h2>
                <h5 className="pending-fine late">
                  Pending Fine: <span>{fineCount}</span>
                </h5>
              </div>
              <GridTable data={data} columns={columns} minHeight={"375px"} />
            </div>
          </div>
        </div>

        <Modal
          open={showCheckInModal}
          onClose={() => setShowCheckInModal(false)}
          center
        >
          <h2>Confirm Check-In</h2>
          <p>Are you sure you want to Check-In?</p>
          <form onSubmit={handleSubmit(onSubmitCheckIn)}>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                onClick={() => setShowCheckInModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                type="submit"
              >
                OK
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={showCheckOutModal}
          onClose={() => setShowCheckOutModal(false)}
          center
        >
          <h2>Confirm Check-Out</h2>
          <p>Are you sure you want to Check-Out?</p>
          <form onSubmit={handleSubmit(onSubmitCheckOut)}>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                onClick={() => setShowCheckOutModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                type="submit"
              >
                OK
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
