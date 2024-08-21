"use client";
import React, { useMemo, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UpdateFineStatus, getLate, getAllUsers } from "../../../Apis/apis";
import "react-toastify/dist/ReactToastify.css";
import AddEmployeeModal from "../Models/AddEmpolyeeModal";
import LeaveResponseModal from "../Models/LeaveResponseModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { GridTable } from "../Common/gridTable";
import { ToastContainer, toast } from "react-toastify";

export default function AdminHome() {
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);

  const [attendanceData, setAttendanceData] = useState([]);

  const [isLateFilter, setIsLateFilter] = useState("");
  const [paidEntry, setPaidEntry] = useState([]);
  const [finePaid, setFinePaid] = useState("");
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [isFinePending, setIsFinePending] = useState(false);
  const [allUsersData, setAllUersData] = useState({});

  const [leaveResponseModal, setLeaveResponseModal] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (response) {
          setAllUersData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function calculateTotalHours(timeString) {
    if (!timeString) {
      return 0;
    }

    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const totalHours = hours + minutes / 60 + seconds / 3600;

    return totalHours;
  }

  function getWorkingHoursColor(workingHours) {
    if (workingHours < 8.5) {
      return "red";
    } else if (workingHours >= 8.5 && workingHours < 9) {
      return "orange";
    } else {
      return "green";
    }
  }

  const renderWorkingHoursCell = (cell) => {
    const cellValue = cell.getValue();

    const totalHours = calculateTotalHours(cellValue);

    const colorclassName = getWorkingHoursColor(totalHours);

    return <span className={colorclassName}>{cellValue}</span>;
  };

  const handleModalClose = () => {
    setAddEmployeeModal(false);
  };

  const handleButtonClick = () => {
    setAddEmployeeModal(true);
  };
  const fetchData = (filterType) => {
    const dateParameter = searchDate === "" ? null : searchDate;
    const nameParameter = searchText === "" ? null : searchText;

    const params = {
      isLateFilter: filterType,
      name: nameParameter,
      date: dateParameter,
      fineStatus: isFinePending,
    };

    getLate(params)
      .then((response) => {
        if (response) {
          setAttendanceData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleOnClick = () => {
    setLeaveResponseModal(true);
  };
  const handleResponseleaveModalClosed = () => {
    setLeaveResponseModal(false);
  };
  const handleResponseLeave = async (event) => {
    const data = {
      id: paidEntry,
      finePaid: event,
    };

    try {
      await UpdateFineStatus(data).then((result) => {
        const errors = [];
        if (!finePaid) {
          errors.push("Please select Status.");
        }
        if (result.isRequestSuccessfull == "true") {
          toast.success("Request has been Updated");
          setPaidEntry(null);
          const errors = [];
          if (!finePaid) {
            errors.push("Please select Status.");
          }
          setLeaveResponseModal(false);
          setCount(count + 1);

          setFinePaid("");
        } else {
          toast.error("Something went wrong.");
          setLeaveResponseModal(false);
          setPaidEntry(null);
          setFinePaid("");
        }
      });
    } catch (err) {
      toast.error("Error occurred!");
    }
  };

  const columns = [
    {
      header: "Date",
      accessorKey: "createdAt",
    },
    {
      header: "Name",
      accessorKey: "name",
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
      cell: renderWorkingHoursCell,
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
            {value.getValue("isLate") ? "Yes" : "NO"}
          </span>
        </strong>
      ),
    },
    {
      header: "Fine Paid",
      accessorKey: "finePaid",
      cell: (value) => (
        <strong>
          <span
            style={{
              color:
                value.getValue("finePaid") === "Paid"
                  ? "green"
                  : value.getValue("finePaid") === "Pending"
                  ? "red"
                  : "orange",
            }}
          >
            {value.getValue("finePaid")}
          </span>
        </strong>
      ),
    },
    {
      header: "Paid Date",
      accessorKey: "paidDate",
    },
    {
      header: " ",
      accessorKey: " ",
      cell: (entry) =>
        entry.row.original.isLate == true ? (
          <button
            className="px-4 py-2 bg-custom-blue text-white  rounded-btn-border"
            variant="success"
            onClick={() => {
              setPaidEntry(entry.row.original.id);

              handleOnClick();
            }}
          >
            Action
          </button>
        ) : (
          " "
        ),
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSearch();
    }
  };
  const handleSearch = () => {
    fetchData();
    setCount(count + 1);
  };

  useEffect(() => {
    fetchData(isLateFilter);
  }, [isLateFilter, count]);

  useEffect(() => {
    fetchData(isFinePending);
  }, [isFinePending, count]);

  const data = useMemo(() => attendanceData, [attendanceData]);

  return (
    <>
      <div className="grid grid-cols-12 items-center px-20">
        <div className="col-span-6">
          <div>
            <h5 className="text-left text-5xl font-semibold leading-[29.05px] font-inter">
              Attendance list
            </h5>
          </div>
        </div>
        <div className="col-span-6 flex justify-end ">
          <div>
            <button
              className=" px-4 py-2 bg-custom-blue text-white  rounded-btn-border"
              onClick={handleButtonClick}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 items-center px-20">
        <div className="col-span-6">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="true"
                checked={isLateFilter === false}
                onChange={() => {
                  setIsLateFilter(false);
                }}
              />
              &nbsp; Show All Records
            </label>
            &nbsp; &nbsp; &nbsp;
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                value="false"
                checked={isLateFilter === true}
                onChange={() => {
                  setIsLateFilter(true);
                }}
              />
              &nbsp; Show Late Records
            </label>
            &nbsp; &nbsp; &nbsp;
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                value={isFinePending}
                checked={isFinePending}
                onChange={() => setIsFinePending(!isFinePending)}
              />
              <span className="ml-2 mt-marjin-top ">Show Fine Pending</span>
            </label>
          </div>
        </div>
        <div className="col-span-6">
          <div className="row">
            <div className="col-sm-5">
              <form>
                <div className="form-group">
                  <input
                    className="fields form-control"
                    type="text"
                    placeholder="Enter name to search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </form>
            </div>
            <div className="col-sm-5">
              <form>
                <div className="form-group">
                  <input
                    className="fields form-control"
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </form>
            </div>
            <div className="col-sm-2">
              <button
                className="px-4 py-2 bg-custom-blue text-white  rounded-btn-border"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15 px-14">
        <div>
          <GridTable
            data={data}
            columns={columns}
            minHeight={"430px"}
            Width={"430px"}
          />
        </div>
      </div>

      {addEmployeeModal && (
        <AddEmployeeModal open={addEmployeeModal} onClose={handleModalClose} />
      )}

      <LeaveResponseModal
        open={leaveResponseModal}
        onClose={handleResponseleaveModalClosed}
        onConfirm={handleResponseLeave}
      />
    </>
  );
}
