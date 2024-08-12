import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ConfirmationModal from "../Components/Models/confirmationModal.js";
import AddLeaveModal from "../Components/Models/addLeaveModal.js";
import { toast } from "react-toastify";
import { CheckInUser, CheckOutUser, FineCount } from "../../Apis/apis.js";

export default function CheckInCheckOut(props) {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [idData, setIdData] = useState(null);
  const [attenddID, setAttenddID] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isChanged, setIsChanged] = useState(0);
  console.log(props);
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

  const handleModalOpen = (isCheckIn) => {
    if (isCheckIn) {
      setMsg("Check-In");
    } else {
      setMsg("Check-Out");
    }
    setConfirmationModal(true);
  };

  const handleModalClose = () => {
    if (msg && msg === "Check-In") {
      setIsCheckedIn(false);
    } else {
      setIsCheckedOut(false);
    }
    setConfirmationModal(false);
    setLeaveModal(false);
  };

  const handleConfirm = () => {
    if (msg && msg === "Check-In") {
      handleConfirmCheckIn();
    } else {
      handleConfirmCheckout();
    }
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

  return (
    <>
      <div className="mt-16 flex justify-center ">
        <div className="flex space-x-10  ">
          <div className="bg-custom-blue rounded-custom ">
            <Button
              onClick={() => handleModalOpen(true)}
              disabled={isCheckedIn}
              startIcon={
                <img
                  src={isCheckedIn ? "/check_in (2).png" : "/check_in.png"}
                  alt="Check-Out Icon"
                  className="mt-4 mb-4 "
                />
              }
              sx={{
                backgroundColor: isCheckedIn ? "#F1F2F2" : "custom-blue",
                color: isCheckedIn ? " #767676" : "white",
                color: "white",
                width: "350px",
                height: "100px",
                borderRadius: "16px",
                padding: "20px 30px",
                fontSize: "2.5rem",
                font: "inter",

                "&:hover": {
                  backgroundColor: isCheckedIn ? "#767676" : "#F1F2F2",
                },
              }}
            >
              Check-In
            </Button>
          </div>
          <div className="bg-custom-blue rounded-custom">
            <Button
              onClick={() => handleModalOpen(false)}
              disabled={isCheckedOut}
              startIcon={
                <img
                  src={isCheckedOut ? "/check_out gray.png" : "/check-out.png"}
                  alt="Check-In Icon"
                  className="mt-4 mb-4"
                />
              }
              sx={{
                backgroundColor:
                  isCheckedOut || !isCheckedIn ? "#F1F2F2" : "custom-blue",
                color: isCheckedOut ? " #767676" : "white",
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
              Check-Out
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={confirmationModal}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        msg={msg}
      />

      <AddLeaveModal
        open={leaveModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmCheckout}
      />
    </>
  );
}
