import React, { useState, useMemo, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { GridTable } from "./GridTable";
import { fetchAllAttendanceData } from "../Api/Api";
import "./css/UserListAdmin.css";

function UsersListAdmin() {
  const [attendanceData, setAttendanceData] = useState([]);

  function calculateTotalHours(timeString) {
    if (!timeString) {
      return 0; // Handle the case where timeString is undefined or empty
    }

    // Split the timeString by ':' and convert to hours
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Calculate the total hours
    const totalHours = hours + minutes / 60 + seconds / 3600;

    return totalHours;
  }

  // Define a function to apply conditional formatting based on total hours
  function getWorkingHoursColor(workingHours) {
    if (workingHours < 8.5) {
      return "red";
    } else if (workingHours >= 8.5 && workingHours < 9) {
      return "orange";
    } else {
      return "green";
    }
  }
  // function isLateColor(isLate) {
  //   console.log(isLate)
  //   if (isLate === false) {
  //     return "red";
  //   } else {
  //     return "green";
  //   }
  // }

  // Define a function to render the "Working Hours" cell with conditional formatting
  const renderWorkingHoursCell = (cell) => {
    const cellValue = cell.getValue();

    // Calculate total hours from the "HH:MM:SS" format (with error handling)
    const totalHours = calculateTotalHours(cellValue);

    // Calculate the CSS class based on the total hours
    const colorClass = getWorkingHoursColor(totalHours);

    return <span className={colorClass}>{cellValue}</span>;
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
      header: "Is Hours Completed",
      accessorKey: "isHourCompleted",
      cell: (value) => (
        <strong>
          <span
            style={{
              color: value.getValue("isHourCompleted") ? "red" : "green",
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
            {value.getValue("isLate") ? "Late" : "On Time"}
          </span>
        </strong>
      ),
    },
  ];

  useEffect(() => {
    fetchAllAttendanceData().then((response) => {
      if (response) {
        setAttendanceData(response);
      }
    });
  }, []);

  const data = useMemo(() => attendanceData, [attendanceData]);

  return (
    <div>
      <h2 className="headingList">Employees Attendance List</h2>
      <GridTable data={data} columns={columns} minHeight={"300px"} />
    </div>
  );
}

export default UsersListAdmin;
