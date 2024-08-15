import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const LeavesDetailsModal = ({ open, onClose, leaveDeatilsData }) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="p-6 rounded-md custom-EmployeeModal ">
        <div className="bg-custom-blue text-white p-5 rounded-xl my-5">
          <label className="m-0">Leave Details</label>
        </div>
        <div className="">
          <p className="font-bold grid gap-4 grid-cols-2">
            Description :
            <span className="font-normal">
              {leaveDeatilsData && leaveDeatilsData.description
                ? leaveDeatilsData.description
                : "-"}
            </span>
          </p>
          <p className="font-bold grid gap-4 grid-cols-2">
            Admin Request Viewer :
            <span className="font-normal">
              {leaveDeatilsData && leaveDeatilsData.adminRequestViewer
                ? leaveDeatilsData.adminRequestViewer
                : "-"}
            </span>
          </p>
          <p className="font-bold grid gap-4 grid-cols-2">
            Comments :
            <span className="font-normal">
              {leaveDeatilsData && leaveDeatilsData.comments
                ? leaveDeatilsData.comments
                : "-"}
            </span>
          </p>
          <p className="font-bold grid gap-4 grid-cols-2">
            Createdate :
            <span className="font-normal">
              {leaveDeatilsData && leaveDeatilsData.createdAt
                ? leaveDeatilsData.createdAt
                : "-"}
            </span>
          </p>
          <p className="font-bold grid gap-4 grid-cols-2">
            Updatedate:
            <span className="font-normal">
              {leaveDeatilsData && leaveDeatilsData.updatedAt
                ? leaveDeatilsData.updatedAt
                : "-"}
            </span>
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className=" py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl hover:bg-custom-hover"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LeavesDetailsModal;
