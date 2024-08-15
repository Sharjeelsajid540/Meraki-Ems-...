import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-datepicker/dist/react-datepicker.css";

import "react-quill/dist/quill.snow.css";
export default function ({ open, onClose, viewBase64 }) {
  const pdfData = `data:application/pdf;base64,${viewBase64}`;
  return (
    <Modal open={open} onClose={onClose} center>
      <iframe
        class
        src={pdfData}
        title="PDF Viewer"
        width="100%"
        height="600px"
      />
    </Modal>
  );
}
