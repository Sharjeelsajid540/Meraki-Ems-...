"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import SideNavbar from "../../Components/sideNavbar";
import Loader from "../../Components/loader.js";
import { GridTable } from "../../Components/gridTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { UpdateLeaveStatus, getPendingLeaves } from "../../../Apis/apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/Components/Models/confirmationModal";

export default function Home() {
    const [isLeaveFilter, setisLeaveFilter] = useState(true);
    const [loader, setLoader] = useState(false);
    const [leaveData, setLeaveData] = useState([]);
    const [isChanged, setIsChanged] = useState(0);
    const [usID, setUsID] = useState(null);
    const [userName, setUserName] = useState("");
    const [count, setCount] = useState(0);
    const [selectedLeave, setSelectedLeave] = useState();
    const [searchSelect, setSearchStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    const [status, setStatus] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchData(isLeaveFilter);
        getPendingLeaves(isLeaveFilter).then((response) => {
            if (response) {
                setLeaveData(response);
            }
        });
    }, [isLeaveFilter, count]);
    useEffect(() => {
        if (selectedLeave) {
            setStatus(selectedLeave.status);
        }
    }, [selectedLeave]);

    const handleSearch = () => {
        fetchData(isLeaveFilter);
        setCount(count + 1);
    };

    // useEffect(() => {
    //     var role = localStorage.getItem("loginData");
    //     var roleData = JSON.parse(role);
    //     const uID = localStorage?.getItem("LoginData");
    //     if (uID) {
    //         setUsID(JSON.parse(uID));
    //     }
    //     const userName = localStorage?.getItem("userName");
    //     if (userName == null || userName == undefined || userName == "") {
    //         router.push("/", { scroll: false });
    //     }

    // }, [router]);


    // useEffect(() => {
    //     if (usID) {
    //         fetchLeave({ id: usID.id }).then((response) => {
    //             setLeaveData(response);
    //         });
    //     }
    // }, [isChanged, usID]);
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
                    // console.log(attendanceData);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default behavior (page refresh)
            // Call your search function here
            handleSearch();
        }
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
            header: "Details",
            cell: (entry) => (
                <button
                    className="secondary-btn-respond"
                    variant="success"
                    onClick={() => {
                        setSelectedLeave(entry.cell.row.original);
                        setShow(true);
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
                    className="secondary-btn-respond"
                    variant="success"
                    onClick={() => {
                        setSelectedLeave(entry.cell.row.original);
                        handleShow();
                    }}
                >
                    Respond
                </button>
            ),
        },


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
                                        Leaves Request List
                                    </h5>
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
                                            checked={isLeaveFilter === true}
                                            onChange={() => setisLeaveFilter(true)}
                                        />
                                        <span className="ml-2 mt-marjin-top ">Show Pending Leaves</span>
                                    </label>
                                    &nbsp; &nbsp; &nbsp;
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="radio"
                                            value="false"
                                            checked={isLeaveFilter === false}
                                            onChange={() => setisLeaveFilter(false)}
                                        />
                                        <span className="ml-2  mt-marjin-top ">Show All Leaves</span>
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
                                                <select
                                                    className="fields form-control"
                                                    value={searchSelect}
                                                    onChange={(e) => setSearchStatus(e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="pending">Pending</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="">
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

            {/* <ConfirmationModal
                open={confirmationModal}
                onClose={handleModalClose}
                onConfirm={handleConfirm}
                msg={msg}
            /> */}

        </>
    );
}
