import React, { useState, useEffect, useMemo } from "react";
import "./css/CheckBtn.css";
import {
  CheckInUser,
  CheckOutUser,
  fetchAttendanceData,
  CheckInStatus,
  CheckOutStatus,
} from "../Api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GridTable } from "./GridTable";

import { Button, Modal } from "react-bootstrap";
import "./css/AttendanceList.css";

function AttendanceList() {
  const id = localStorage.getItem("loginData");
  var idData = JSON.parse(id);

  const attendId = localStorage.getItem("attendList");
  var attenddID = JSON.parse(attendId);
  // const attendanceID = attendID ? attendID.attendanceID : null;

  const [attendanceData, setAttendanceData] = useState([]);
  const [isChanged, setIsChanged] = useState(0);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);

  const checkCheckInStatus = async (data) => {
    try {
      const response = await CheckInStatus(data);
      if (response.status === true) {
        setHasCheckedIn(true);
      } else {
        setHasCheckedIn(false);
      }
    } catch (error) {
      console.error("Error checking check-in status:", error);
    }
  };

  const checkCheckOutStatus = async (data) => {
    try {
      const response = await CheckOutStatus(data);
      if (response.status === false) {
        setHasCheckedOut(true);
        // Reset the button when user hasn't checked out
      } else {
        setHasCheckedOut(false);
      }
    } catch (error) {
      console.error("Error checking check-out status:", error);
    }
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
  ];

  const confirmCheckIn = async () => {
    try {
      const data = {
        userID: idData.id,
      };
      const response = await CheckInUser(data);
      if (response && response.isRequestSuccessfull === "true") {
        toast.success(response.successMessage);

        setIsChanged(isChanged + 1);
      } else if (response && response.isRequestSuccessfull === "false") {
        toast.error(response.successMessage);
      } else if (response && response.errors) {
        console.log(response.errors);
        toast.error("Something Went Wrong");
      } else {
        console.log("Unexpected response:", response);
        toast.error("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while processing your request");
    }
    setShowCheckInModal(false);
  };

  const confirmCheckOut = async () => {
    const data = {
      attendanceID: attenddID.id,
      userID: idData.id,
    };

    const response = await CheckOutUser(data);
    try {
      if (response.isRequestSuccessfull == "true") {
        toast.success(response.successMessage);

        setIsChanged(isChanged + 1);
      } else if (response && response.isRequestSuccessfull == "false") {
        toast.error(response.successMessage);
      } else if (response && response.errors) {
        toast.error("Something Went Wrong");
      } else {
        console.error("Error checking out:", response.data);
      }
    } catch (error) {
      console.error("Error checking out:", error);
    }

    setShowCheckOutModal(false);
  };

  const handleCheckIn = () => {
    if (!hasCheckedIn) {
      setShowCheckInModal(true);
    }
  };

  const handleCheckOut = () => {
    if (!hasCheckedOut) {
      setShowCheckOutModal(true);
    }
  };

  useEffect(() => {
    const data = {
      userID: idData.id,
    };

    fetchAttendanceData(data).then((response) => {
      if (response) {
        setAttendanceData(response);
      }
    });
    checkCheckInStatus(data);
    checkCheckOutStatus(data);
  }, [isChanged]);

  const data = useMemo(() => attendanceData, [attendanceData]);

  return (
    <>
      <div className="attendanceList">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h2>Check-In</h2>
                <button
                  className={`btn btn-1 ${hasCheckedIn ? "btn-clicked" : ""}`}
                  onClick={handleCheckIn}
                  disabled={hasCheckedIn}
                >
                  {hasCheckedIn ? "Checked IN ✓" : "CheckIn"}
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h2>Check-Out</h2>
                <button
                  className={`btn btn-1 ${hasCheckedOut ? "btn-clicked" : ""}`}
                  onClick={handleCheckOut}
                  disabled={hasCheckedOut}
                >
                  {hasCheckedOut ? "Checked Out ✓" : "CheckOut"}
                </button>
                <Modal
                  show={showCheckInModal}
                  onHide={() => setShowCheckInModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Check-In</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to Check-In?</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowCheckInModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmCheckIn}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={showCheckOutModal}
                  onHide={() => setShowCheckOutModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Check-Out</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to Check-Out?</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowCheckOutModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmCheckOut}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>Employee Attendance</h2>

              <GridTable data={data} columns={columns} minHeight={"375px"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceList;
