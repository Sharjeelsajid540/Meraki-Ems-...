"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import SideNavbar from "../../Components/sideNavbar";
import Loader from "../../Components/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import AddInterviewModal from "../../Components/Models/AddInterviewModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchInterData } from "../../../Apis/apis";
import { AddInterviewCandidate } from "../../../Apis/apis";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import { updateCandidateData } from "../../../Apis/apis";
import { DeleteCandidateData } from "../../../Apis/apis";
import DeleteConfirmationModal from "../../Components/Models/DeleteConfirmatioModal";
import { ShowCvCandidate } from "../../../Apis/apis";
import ViewCvModal from "../../Components/models/ViewCvModal";
import { GridTable } from "../../Components/gridTable";
import ViewCommentsModal from "../../Components/models/ViewCommentsModal";

export default function Home() {
  const [addInterviewModal, setAddInterviewModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [loader, setLoader] = useState(false);
  const [interviewData, setInterviewData] = useState([]);
  const [isDataFilter, setisDataFilter] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalFooter, setModalFooter] = useState("");
  const [employyeeName, setEmployeeName] = useState("");
  const [updateData, setUpdateData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [viewCv, setViewCv] = useState(false);
  const [viewBase64, setViewBase64] = useState("");
  const [search, setSearch] = useState(false);
  const [viewCommentsModal, setViewCommentsModal] = useState(false);
  const [showComments, setShowComments] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [isCvToastActive, setIsCvToastActive] = useState(false);

  const handleOnClick = () => {
    setAddInterviewModal(true);
    setModalHeader("Add Interview Data");
    setModalFooter("Submit");
  };

  const handleModalClose = () => {
    setAddInterviewModal(false);
    setDeleteConfirmation(false);
    setViewCv(false);
    setViewCommentsModal(false);
  };

  const handleCvModal = async (id) => {
    const response = await ShowCvCandidate(id);

    const base64String = response.file;

    if (!base64String) {
      setViewCv(false);
      if (!isCvToastActive) {
        setIsCvToastActive(true);
        toast.error("No CV uploaded", {
          onClose: () => setIsCvToastActive(false),
        });
      }
    } else {
      setViewBase64(base64String);
      setViewCv(true);
    }
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleComments = (comments) => {
    if (!comments) {
      setViewCommentsModal(false);
      if (!isToastActive) {
        setIsToastActive(true);
        toast.error("No Comments Uploaded", {
          onClose: () => setIsToastActive(false),
        });
      }
    } else {
      setShowComments(comments);
      setViewCommentsModal(true);
    }
  };

  const handleUpdateClick = (data) => {
    setUpdateData(data);
    // console.log("data", data);
    setAddInterviewModal(true);
    setModalHeader("Update Interview Data");
    setModalFooter("Update");
  };

  const openConfirmationModal = (id) => {
    setDeleteConfirmation(true);
    setDeleteItemId(id);
  };

  const handleDeleteData = async () => {
    try {
      await DeleteCandidateData(deleteItemId).then((response) => {
        if (response.isRequestSuccessful) {
          toast.success("Candidate Deleted Successfully");
          fetchInterData(isDataFilter, searchText).then((response) => {
            setInterviewData(response);
          });
          handleModalClose();
        } else {
          toast.error("Failed to Delete Candidate");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleConfirmAddInterviewData = async (data) => {
    setLoader(true);
    try {
      if (modalFooter === "Submit") {
        const response = await AddInterviewCandidate(data);
        if (response.isRequestSuccessful) {
          toast.success("Request has been Added");
          const fetchResponse = await fetchInterData(isDataFilter, searchText);
          setInterviewData(fetchResponse);
        } else {
          toast.error("Error occurred. Please try again!");
        }
      } else if (modalFooter === "Update") {
        const updatedData = {
          ...data,
          performanceID: updateData.id,
        };
        const response = await updateCandidateData(updatedData);
        if (response.isRequestSuccessful) {
          toast.success("Candidate data has been updated");
          const fetchResponse = await fetchInterData(isDataFilter, searchText);
          setInterviewData(fetchResponse);
        } else {
          toast.error(
            "Error occurred while updating candidate data. Please try again!"
          );
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An unexpected error occurred. Please try again!");
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = () => {
    setSearch(!search);
  };
  const handleReset = () => {
    setSearchText("");
    setSearch(!search);
  };

  useEffect(() => {
    fetchInterData(isDataFilter, searchText).then((response) => {
      setInterviewData(response);
    });
  }, [search]);

  const columns = [
    {
      header: "Name",
      accessorKey: "employeeName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Contact No",
      accessorKey: "contactNo",
    },
    {
      header: "Experience",
      accessorKey: "experience",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Programming Language",
      accessorKey: "programmingLanguage",
    },

    {
      header: "Interview Date",
      accessorKey: "date",
    },
    {
      header: "Comments",
      accessorKey: "comments",
      cell: (data) => (
        <button
          className="py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl  hover:bg-custom-hover"
          onClick={() =>
            handleComments(stripHtmlTags(data.row.original.comments))
          }
        >
          View
        </button>
      ),
    },
    {
      header: "Technical skill",
      accessorKey: "rating",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.rating}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },
    {
      header: "Discipline",
      accessorKey: "discipline",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.discipline}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },
    {
      header: "professionalAttitude	",
      accessorKey: "professionalAttitude",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.professionalAttitude}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },
    {
      header: "Overall Rating	",
      accessorKey: "overallRating",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.overallRating}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: " ",
      cell: (data) => (
        <div className="flex gap-2">
          <button
            className=" py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl hover:bg-custom-hover"
            onClick={() => handleUpdateClick(data.row.original)}
          >
            Update
          </button>
          <button
            className="py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl  hover:bg-custom-hover"
            onClick={() => handleCvModal(data.row.original.id)}
          >
            View
          </button>
          <button
            className=" py-2 px-4 font-bold rounded hover:text-red-500 "
            onClick={() => openConfirmationModal(data.row.original.id)}
          >
            <div className="flex">
              <img className="" src="/mdi_delete.png" />
              <span className="text-red-500">Delete</span>
            </div>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loader && <Loader />}
      <ToastContainer />

      <div className="flex">
        <SideNavbar />
        <div className="w-4/5">
          <Navbar />

          <div className="mt-10">
            <div className="grid grid-cols-12 items-center px-14">
              <div className="col-span-6">
                <div className="">
                  <h5 className="text-left text-4xl font-semibold leading-[29.05px] font-inter">
                    Interview Data
                  </h5>
                </div>
              </div>
              <div className="col-span-6 flex justify-end">
                <div className="">
                  <input
                    className="border border-solid border-black mr-5 rounded py-3 px-5"
                    placeholder="Enter name to search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleOnClick}
                    type="submit"
                    className="py-4 px-5 bg-custom-blue text-white font-bold rounded hover:bg-custom-hover rounded-2xl mb-5"
                  >
                    Add Applicant
                  </button>
                </div>
              </div>
            </div>

            <div className=" mt-2 px-12">
              <GridTable data={interviewData} columns={columns} />
            </div>
          </div>
        </div>
      </div>

      <AddInterviewModal
        open={addInterviewModal}
        onClose={handleModalClose}
        onConfirm={handleConfirmAddInterviewData}
        modalHeader={modalHeader}
        modalFooter={modalFooter}
        updateData={updateData}
      />

      <DeleteConfirmationModal
        open={deleteConfirmation}
        onClose={handleModalClose}
        onConfirm={handleDeleteData}
        handleDeleteData={handleDeleteData}
      />
      <ViewCvModal
        open={viewCv}
        onClose={handleModalClose}
        viewBase64={viewBase64}
      />

      <ViewCommentsModal
        open={viewCommentsModal}
        onClose={handleModalClose}
        showComments={showComments}
      />
    </>
  );
}
