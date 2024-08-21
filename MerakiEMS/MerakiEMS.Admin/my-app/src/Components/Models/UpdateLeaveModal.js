import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const UpdateLeaveModal = ({ open, onClose, updateleaveData, update }) => {
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    update({ status, comments });
    onClose();
  };

  const handleClose = () => {
    onClose();
    setStatus("");
    setComments("");
  };

  useEffect(() => {
    if (updateleaveData) {
      setComments(updateleaveData.comments);
    }

    if (updateleaveData) {
      setStatus(updateleaveData.status);
    }
  }, [updateleaveData]);

  return (
    <Modal open={open} onClose={handleClose} center>
      <div className="p-6 rounded-md custom-EmployeeModal">
        <div className="mb-4 bg-custom-blue text-white px-5 rounded-xl">
          <h2>Update Leave Request</h2>
        </div>
        <div>
          <p className="font-bold ">
            Name:{" "}
            <span className="font-normal">{updateleaveData?.name || "-"}</span>
          </p>
          <p className="font-bold ">
            From:{" "}
            <span className="font-normal">{updateleaveData?.from || "-"}</span>
          </p>
          <p className="font-bold ">
            To:{" "}
            <span className="font-normal">{updateleaveData?.to || "-"}</span>
          </p>
          <p className="font-bold ">
            Description:{" "}
            <span className="font-normal">
              {updateleaveData?.description || "-"}
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Status</label>
            <select
              className="border border-solid border-black mr-5 rounded px-5 h-[40px] w-[740px]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="mt-5">
            <label>Comments</label>
            <textarea
              className="border border-solid border-black mr-5 rounded px-5 h-[100px] w-[740px] resize-none"
              type="text"
              placeholder="Enter Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <div className="mt-5 space-x-2">
            <button
              className="py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl hover:bg-custom-hover"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="py-2 px-4 bg-custom-blue text-white font-bold rounded-2xl hover:bg-custom-hover"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateLeaveModal;
