import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function ({ open, onClose, showComments }) {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="p-6  rounded-md custom">
        <div className="mb-4 bg-custom-blue text-white px-5 rounded-xl">
          <h2>Comments:</h2>
        </div>
        <div>
          <p>{showComments}</p>
        </div>
      </div>
    </Modal>
  );
}
