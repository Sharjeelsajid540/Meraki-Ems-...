"use client";
import React, { useEffect, useState } from "react";
import LeavesDetailsModal from "../Models/LeavesDetailsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPendingLeaves, updateLeaveStatus } from "../../../Apis/apis";
import UpdateLeaveModal from "../Models/UpdateLeaveModal";
import { GridTable } from "../Common/gridTable";

export default function ShowLeavesAdmin() {
  const [leaveData, setLeaveData] = useState([]);
  const [isLeaveFilter, setisLeaveFilter] = useState(true);
  const [searchSelect, setSearchStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [selectedLeave, setSelectedLeave] = useState();
  const [leavesDetailsModal, setLeavesDetailsModal] = useState(false);
  const [updateLeaveModal, setUpdateLeaveModal] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState(false);

  const fetchData = (filterType) => {
    const statusParameter = searchSelect === "" ? null : searchSelect;
    const nameParameter = searchText === "" ? null : searchText;

    const params = {
      isLeaveFilter: filterType,
      name: nameParameter,
      status: statusParameter,
    };

    getPendingLeaves(isLeaveFilter, searchText, searchSelect)
      .then((response) => {
        if (response) {
          setLeaveData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch = () => {
    fetchData(isLeaveFilter);
    setCount(count + 1);
    setSearch(!search);
  };

  const handleModalClose = () => {
    setLeavesDetailsModal(false);
    setUpdateLeaveModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const update = async (formdata) => {
    const data = {
      id: selectedLeave.id,
      status: formdata.status,
      adminRequestViewer: adminName,
      comments: formdata.comments,
    };
    try {
      updateLeaveStatus(data);
      setRefresh(!refresh);
      toast.success("Request has been Updated");
    } catch (err) {
      toast.error("Error occurred!");
    }
  };

  const reset = () => {
    setSearchText("");
    setSearch(!search);
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "From",
      accessorKey: "from",
    },
    {
      header: "To",
      accessorKey: "to",
    },

    {
      header: "Leave Type",
      accessorKey: "leaveType",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => (
        <strong>
          <span
            style={{
              color:
                value.getValue("Status") === "Approved"
                  ? "green"
                  : value.getValue("Status") === "Rejected"
                  ? "red"
                  : "orange",
            }}
          >
            {value.getValue("Status")}
          </span>
        </strong>
      ),
    },
    {
      header: "Details",
      cell: (entry) => (
        <button
          className=" py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl hover:bg-custom-hover"
          variant="success"
          onClick={() => {
            setSelectedLeave(entry.cell.row.original);
            setLeavesDetailsModal(true);
          }}
        >
          Details
        </button>
      ),
    },
    {
      header: "Action",
      cell: (entry) => (
        <button
          className=" py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl hover:bg-custom-hover"
          variant="success"
          onClick={() => {
            setSelectedLeave(entry.cell.row.original);
            setUpdateLeaveModal(true);
          }}
        >
          Respond
        </button>
      ),
    },
  ];

  useEffect(() => {
    fetchData(isLeaveFilter);
    const id = localStorage.getItem("LoginData");
    if (id) {
      const idData = JSON.parse(id);

      setAdminName(idData.name);
    }
  }, [selectedLeave, isLeaveFilter, searchSelect, refresh, search]);

  return (
    <>
      <div className="mt-10">
        <div className="ml-20">
          <h5 className="text-left text-4xl font-semibold leading-[29.05px] font-inter">
            Leave Request List
          </h5>
        </div>
        <div className="ml-20 mt-10">
          <div className="">
            &nbsp; &nbsp;
            <label>
              <input
                type="radio"
                value=""
                checked={searchSelect === ""}
                onChange={() => setSearchStatus("")}
              />
              &nbsp; All Leaves
            </label>
            &nbsp; &nbsp;
            <label>
              <input
                type="radio"
                value="Pending"
                checked={searchSelect === "Pending"}
                onChange={() => setSearchStatus("Pending")}
              />
              &nbsp; Pending Leaves
            </label>
            &nbsp; &nbsp;
            <label>
              <input
                type="radio"
                value="Approved"
                checked={searchSelect === "Approved"}
                onChange={() => setSearchStatus("Approved")}
              />
              &nbsp; Approved Leaves
            </label>
            &nbsp; &nbsp;
            <label>
              <input
                type="radio"
                value="Rejected"
                checked={searchSelect === "Rejected"}
                onChange={() => setSearchStatus("Rejected")}
              />
              &nbsp; Rejected Leaves
            </label>
          </div>
          <div className="-mt-[50px] flex justify-end mr-[50px]">
            <input
              className="border border-solid border-black mr-5 rounded  px-5 h-[40px]"
              type="text"
              placeholder="Enter name to search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              type="submit"
              className="py-4 px-5 bg-custom-blue text-white font-bold hover:bg-custom-hover rounded-2xl mb-5 mr-5"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              type="submit"
              className="py-4 px-5 bg-custom-blue text-white font-bold hover:bg-custom-hover rounded-2xl mb-5 mr-5"
              onClick={reset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="py-4 px-5 bg-custom-blue text-white font-bold rounded hover:bg-custom-hover rounded-2xl mb-5"
            >
              Show Calendar
            </button>
          </div>
        </div>

        <div className="mt-2 px-12">
          <GridTable data={leaveData} columns={columns} />

          <LeavesDetailsModal
            open={leavesDetailsModal}
            onClose={handleModalClose}
            leaveDeatilsData={selectedLeave}
          />

          <UpdateLeaveModal
            open={updateLeaveModal}
            onClose={handleModalClose}
            updateleaveData={selectedLeave}
            update={update}
          />
        </div>
      </div>
    </>
  );
}
