import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ConfirmationModal = ({ open, onClose, onConfirm, msg }) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="p-6  rounded-md custom">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-red-600">Alert!</h1>
          <div className="mt-4">
            <label className="block text-3xl">
              Are you sure you want to {msg}?
            </label>
          </div>
        </div>
        <div className="flex gap-4 mt-10">
          <button
            className="flex-1 py-2 px-4 bg-custom-blue text-white font-bold rounded hover:bg-green-700"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="flex-1 py-2 px-4 bg-custom-blue text-white font-bold rounded hover:bg-red-700"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
