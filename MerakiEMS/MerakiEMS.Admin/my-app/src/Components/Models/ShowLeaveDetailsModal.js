import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function ({
  open,
  onClose,
  selectedLeave,
  selectedLeaveFields,
}) {
  return (
    <Modal open={open} onClose={onClose} center>
      <h2>Leave Details</h2>
      {selectedLeave ? (
        <table>
          <tbody>
            {selectedLeaveFields.map((field) => (
              <tr key={field}>
                <td className="name-column">
                  {field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()}
                </td>
                <td>{selectedLeave[field]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data selected.</p>
      )}
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <button
          onClick={onClose}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
