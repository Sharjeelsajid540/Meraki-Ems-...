"use client";
import React, { useMemo, useState, useEffect } from "react";
import Navbar from "../../../Components/navbar";
import Button from "@mui/material/Button";
import SideNavbar from "../../../Components/sideNavbar";
import { GridTable } from "../../../Components/gridTable";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchAttendanceData,
  FineCount,
  CheckOutUser,
  CheckInUser,
} from "../../../../Apis/apis";
import ConfirmationModal from "../../../Components/Models/confirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [idData, setIdData] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [fineCount, setFineCount] = useState(0);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [msg, setMsg] = useState("");
  const [attenddID, setAttenddID] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("LoginData");
    const attendId = localStorage.getItem("attendList");

    if (id) {
      const parsedId = JSON.parse(id);
      setIdData(parsedId.id);
      setIsCheckedIn(parsedId.isCheckedIn);
      setIsCheckedOut(parsedId.isCheckedOut);

      FineCount(parsedId.id)
        .then((data) => {
          if (data) {
            setFineCount(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching fine count:", error);
        });

      const data = { userID: parsedId.id };
      fetchAttendanceData(data)
        .then((response) => {
          if (response) {
            setAttendanceData(response);
          } else {
            toast.error("No Data Found!");
          }
        })
        .catch((error) => {
          toast.error("An error occurred while fetching attendance data");
        });
    }

    if (attendId) {
      setAttenddID(JSON.parse(attendId));
    }
  }, [refresh]);

  const handleConfirmCheckIn = async () => {
    if (!idData) {
      toast.error("Invalid user ID");
      return;
    }

    try {
      const data = { userID: idData };
      const response = await CheckInUser(data);
      if (response && response.isRequestSuccessfull === "true") {
        toast.success(response.successMessage);
        setIsCheckedIn(true);
        setIsCheckedOut(false);
        localStorage.setItem(
          "LoginData",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("LoginData")),
            isCheckedIn: true,
            isCheckedOut: false,
          })
        );
        setRefresh(!refresh);
      } else {
        toast.error(response.successMessage);
      }
    } catch (error) {
      toast.error("An error occurred while processing your request");
    }

    setConfirmationModal(false);
  };

  const handleConfirmCheckout = async () => {
    if (!attenddID || !idData) {
      toast.error("Invalid attendance or user ID");
      return;
    }

    try {
      const data = {
        attendanceID: attenddID.id,
        userID: idData,
      };
      const response = await CheckOutUser(data);
      if (response && response.isRequestSuccessfull === "true") {
        toast.success(response.successMessage);
        setIsCheckedOut(true);
        setIsCheckedIn(false);
        localStorage.setItem(
          "LoginData",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("LoginData")),
            isCheckedOut: true,
            isCheckIn: false,
          })
        );
        setRefresh(!refresh);
      } else {
        toast.error(response.successMessage);
      }
    } catch (error) {
      toast.error("An error occurred while processing your request");
    }

    setConfirmationModal(false);
  };

  const columns = [
    {
      header: "Date",
      accessorKey: "createdAt",
    },
    {
      header: "CheckIn Time",
      accessorKey: "checkInTime",
    },
    {
      header: "CheckOut Time",
      accessorKey: "checkOutTime",
    },
    {
      header: "Working Hours",
      accessorKey: "workingHours",
    },
    {
      header: "Hours Completed",
      accessorKey: "isHourCompleted",
      cell: (value) => (
        <strong>
          <span
            style={{
              color: value.getValue("isHourCompleted") ? "green" : "red",
            }}
          >
            {value.getValue("isHourCompleted") ? "Yes" : "No"}
          </span>
        </strong>
      ),
    },
    {
      header: "Is Late",
      accessorKey: "isLate",
      cell: (value) => (
        <strong>
          <span style={{ color: value.getValue("isLate") ? "red" : "green" }}>
            {value.getValue("isLate") ? "Yes" : "No"}
          </span>
        </strong>
      ),
    },
    {
      header: "Fine Paid",
      accessorKey: "finePaid",
    },
  ];

  const data = useMemo(() => attendanceData, [attendanceData]);

  const handleModalOpen = (isCheckIn) => {
    setMsg(isCheckIn ? "Check-In" : "Check-Out");
    setConfirmationModal(true);
  };

  const handleModalClose = () => {
    setConfirmationModal(false);
  };

  const handleConfirm = () => {
    if (msg === "Check-In") {
      handleConfirmCheckIn();
    } else {
      handleConfirmCheckout();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex">
        <SideNavbar />
        <div className="w-full">
          <Navbar />
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-10">
              <div className="bg-custom-blue rounded-custom">
                <Button
                  onClick={() => handleModalOpen(true)}
                  disabled={isCheckedIn}
                  startIcon={
                    <img
                      src={isCheckedIn ? "/check_in (2).png" : "/check_in.png"}
                      alt="Check-In Icon"
                      className="mt-4 mb-4"
                    />
                  }
                  sx={{
                    backgroundColor: isCheckedIn ? "#F1F2F2" : "custom-blue",
                    color: isCheckedIn ? "#767676" : "white",
                    width: "350px",
                    height: "100px",
                    borderRadius: "16px",
                    padding: "20px 30px",
                    fontSize: "2.5rem",
                    "&:hover": {
                      backgroundColor: isCheckedIn ? "#767676" : "#F1F2F2",
                    },
                  }}
                >
                  Check-in
                </Button>
              </div>
              <div className="bg-custom-blue rounded-custom">
                <Button
                  onClick={() => handleModalOpen(false)}
                  disabled={isCheckedOut || !isCheckedIn}
                  startIcon={
                    <img
                      src={
                        isCheckedOut ? "/check_out gray.png" : "/check-out.png"
                      }
                      alt="Check-Out Icon"
                      className="mt-4 mb-4"
                    />
                  }
                  sx={{
                    backgroundColor:
                      isCheckedOut || !isCheckedIn ? "#F1F2F2" : "custom-blue",
                    color: isCheckedOut ? "#767676" : "white",
                    width: "350px",
                    height: "100px",
                    borderRadius: "16px",
                    padding: "20px 30px",
                    fontSize: "2.5rem",
                    "&:hover": {
                      backgroundColor: isCheckedOut ? "#767676" : "#F1F2F2",
                    },
                  }}
                >
                  Check-out
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-15 px-14">
            <div className="grid grid-cols-12 items-center px-4">
              <div className="col-span-6">
                <div>
                  <h5 className="text-left text-4xl font-semibold leading-[29.05px] font-inter">
                    Attendance list
                  </h5>
                </div>
              </div>
              <div className="col-span-6 flex justify-end">
                <div>
                  <label className="text-3xl text-red-500">
                    Fine Pending: {fineCount}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <GridTable
                data={data}
                columns={columns}
                minHeight={"430px"}
                Width={"430px"}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={confirmationModal}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        msg={msg}
      />
    </>
  );
}
