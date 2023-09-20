// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { UpdateLeaveStatus } from "./api";

// const UpdateLeave = ({ leaveId, onClose }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [adminRequestViewer, setAdminRequestViewer] = useState("");
//   const [status, setStatus] = useState("");
//   const [comments, setComments] = useState("");

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await UpdateLeaveStatus(
//         leaveId,
//         leaveId,
//         status,
//         adminRequestViewer,
//         comments
//       );

//       if (response.status == 200) {
//         // Update the state of the React application to reflect the updated leave request.

//         onClose();
//       } else {
//         // Handle the error.
//       }
//     } catch (error) {
//       // Handle the error.
//     }
//   };

//   return (
//     <>
//     <div>
//       <Button variant="secondary" className='secondary-btn-user' onClick={handleShow}>Add Leave</Button>{' '}
//       </div>
//     <Modal show={isOpen} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Update Leave Request</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Admin Request Viewer"
//             value={adminRequestViewer}
//             onChange={(e) => setAdminRequestViewer(e.target.value)}
//           />
//           <select value={status} onChange={(e) => setStatus(e.target.value)}>
//             <option value="">Select Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Approved">Approved</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//           <textarea
//             placeholder="Comments"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />
//         </form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" type="submit">
//           Update
//         </Button>
//       </Modal.Footer>
//     </Modal>
//     </>
//   );
// };

// export default UpdateLeave;
