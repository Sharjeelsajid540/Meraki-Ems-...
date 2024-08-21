"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddLeaveModal from "../Models/AddLeaveModal";
import { addLeave, fetchLeave, sendEmail } from "../../../Apis/apis";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Common/Loader";
import { GridTable } from "../Common/gridTable";

export default function ShowLeavesUser() {
  const [addLeaveModal, setAddLeaveModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [isChanged, setIsChanged] = useState(0);
  const [usID, setUsID] = useState(null);
  const [userNames, setUserNames] = useState("");
  const router = useRouter();

  const handleOnClick = () => {
    setAddLeaveModal(true);
  };

  useEffect(() => {
    var role = localStorage.getItem("loginData");
    var roleData = JSON.parse(role);
    const uID = localStorage?.getItem("LoginData");
    if (uID) {
      const parsedUID = JSON.parse(uID);
      setUsID(parsedUID);
      setUserNames(parsedUID.name);
    }

    const userName = localStorage?.getItem("userName");
    if (userName == null || userName == undefined || userName == "") {
      router.push("/", { scroll: false });
    }
  }, [router]);

  const handleModalClose = () => {
    setAddLeaveModal(false);
  };

  const handleConfirmAddLeave = (Data) => {
    const payLoad = {
      ...Data,
      userID: usID?.id,
      name: userNames,
    };
    setLoader(true);
    addLeave(payLoad).then((response) => {
      setLoader(false);
      if (response.isRequestSuccessful === true) {
        toast.success("Request has been Added");
        setAddLeaveModal(false);
        setIsChanged(isChanged + 1);
        fetchLeave({ id: usID?.id }).then((response) => {
          setLeaveData(response);
        });
      } else {
        toast.error("Error occurred. Please try again!");
      }
    });
  };

  useEffect(() => {
    if (usID) {
      fetchLeave({ id: usID.id }).then((response) => {
        setLeaveData(response);
      });
    }
  }, [isChanged, usID]);

  const columns = [
    {
      header: "From (Date)",
      accessorKey: "from",
    },
    {
      header: "To (Date)",
      accessorKey: "to",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Reviewed By",
      accessorKey: "adminRequestViewer",
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const status = info.getValue();
        let color;
        let text;

        if (status === "Pending") {
          color = "#FFB422";
          text = "Pending";
        } else if (status === "Approved") {
          color = "green";
          text = "Approved";
        } else {
          color = "red";
          text = "Rejected";
        }

        const style = {
          color,
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "19.36px",
          textAlign: "left",
        };

        return <span style={style}>{text}</span>;
      },
    },

    {
      header: "Updated At",
      accessorKey: "updatedAt",
    },
  ];

  return (
    <>
      {loader && <Loader />}
      <div className="mt-10">
        <div className="grid grid-cols-12 items-center px-14">
          <div className="col-span-6">
            <div className="">
              <h5 className="text-left text-4xl font-semibold leading-[29.05px] font-inter">
                Leave Status List
              </h5>
            </div>
          </div>
          <div className="col-span-6 flex justify-end">
            <div className="">
              <button
                onClick={handleOnClick}
                type="submit"
                className="py-4 px-5 bg-custom-blue text-white font-bold rounded hover:bg-custom-hover rounded-2xl mb-5"
              >
                Add Leave Request
              </button>
            </div>
          </div>
        </div>

        <div className=" mt-2 px-12">
          <GridTable
            data={leaveData}
            columns={columns}
            minHeight={"430px"}
            Width={"430px"}
          />
        </div>
      </div>

      <AddLeaveModal
        open={addLeaveModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmAddLeave}
      />
    </>
  );
}
