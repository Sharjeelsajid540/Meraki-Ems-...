"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import SideNavbar from "../../Components/sideNavbar";
import Loader from "../../Components/loader.js";
import { GridTable } from "../../Components/gridTable";
import "bootstrap/dist/css/bootstrap.min.css";
import AddLeaveModal from "../../Components/Models/addLeaveModal.js";
import { addLeave, fetchLeave, sendEmail } from "../../../Apis/apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [addLeaveModal, setAddLeaveModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [isChanged, setIsChanged] = useState(0);
  const [usID, setUsID] = useState(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleOnClick = () => {
    setAddLeaveModal(true);
  };

  useEffect(() => {
    var role = localStorage.getItem("loginData");
    var roleData = JSON.parse(role);
    const uID = localStorage?.getItem("LoginData");
    if (uID) {
      setUsID(JSON.parse(uID));
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
      name: localStorage?.getItem("userName"),
    };
    setLoader(true);
    addLeave(payLoad).then((response) => {
      if (response.isRequestSuccessful === true) {
        toast.success("Request has been Added");
        setAddLeaveModal(false);
        setLoader(false);
        setIsChanged(isChanged + 1);
        fetchLeave({ id: usID?.id }).then((response) => {
          setLeaveData(response);
          // if (response.length > 0) {
          //   const latestLeave = response[0];
          //   const emailData = {
          //     id: usID?.id,
          //     from: latestLeave.from,
          //     to: latestLeave.to,
          //     description: latestLeave.description,
          //   };
          //   sendEmail(emailData);
          // } else {
          //   toast.error("Failed to retrieve the latest leave data.");
          // }
        });
      } else {
        toast.error("Error occurred. Please try again!");
      }
    });
    setLoader(false);
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
    // {
    //   header: "",
    //   accessorKey: "comments",
    // },
  ];

  return (
    <>
      {loader && <Loader />}
      <ToastContainer />

      <div className="flex">
        <SideNavbar />
        <div className="w-full">
          <Navbar />

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
