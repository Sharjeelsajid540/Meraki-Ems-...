import React, { useState, useEffect, useMemo } from "react";
import { SideNavbar } from "./SideNavbar";
import { Profile } from "./Profile";
import "./css/ManageTickets.css";
import { GridTable } from "./GridTable";
import { getAllTickets, updateTickets } from "../Api/Api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageTickets = () => {
  const [ticketsData, setTicketsData] = useState("");
  const [isChanged, setIsChanged] = useState(0);
  const [id, setId] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const user = localStorage.getItem("loginData");
  var userData = JSON.parse(user);

  const showDetails = (ticket) => {
    setId(ticket.row.original.id);
    setDescription(ticket.row.original.description);
    setShowModal(true);
  };

  const columns = [
    {
      header: "Requested By",
      accessorKey: "requesterName",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Category",
      accessorKey: "category",
    },

    {
      header: "Priority",
      accessorKey: "priority",
      cell: (ticket) => (
        <div className={`${ticket.row.original.priority.toLowerCase()}`}>
          {ticket.row.original.priority}
        </div>
      ),
    },

    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
    },
    {
      header: "Reviewed BY",
      accessorKey: "reviewer",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (ticket) => (
        <div
          className={`status ${ticket.row.original.status.toLowerCase()}`}
          variant="outline-secondary"
        >
          {ticket.row.original.status}
        </div>
      ),
    },
    {
      header: " ",
      accessorKey: " ",
      cell: (ticket) =>
        ticket.row.original.status == "Pending" ? (
          <Button
            className="action"
            variant="outline-secondary"
            onClick={() => showDetails(ticket)} // Call the showDetails function with the employee data
          >
            Action
          </Button>
        ) : (
          " "
        ),
    },
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      status,
      id,
      reviewer: userData.name,
    };
    updateTickets(data).then((response) => {
      if (response.isRequestSuccessfull == true) {
        toast.success(response.successMessage);
        setStatus("");
        setId();
        setIsChanged(isChanged + 1);
        setShowModal(false);
      } else {
        toast.error(response.successMessage);
      }
    });
  };
  useEffect(() => {
    getAllTickets().then((response) => {
      if (response) {
        setTicketsData(response);
      }
    });
  }, [isChanged]);
  const data = useMemo(() => ticketsData, [ticketsData]);

  return (
    <>
      <SideNavbar />
      <Profile />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered={true}
        size={"md"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Action</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Row className="mt-1">
              <div className="col-md-12">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label className="form-label-addUser">
                    Description
                  </Form.Label>
                  <Form.Control
                    type="description"
                    placeholder="Enter Title"
                    value={description}
                    disabled={true}
                  />
                </Form.Group>
              </div>
            </Row>
            <Row className="mt-1">
              <div className="col-md-12">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label className="form-label-addUser">
                    Select Status
                  </Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option>Approved</option>
                    <option>Declined</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Row>

            <Row className="mt-1">
              <div className="col-md-12">
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="addBtn1"
                >
                  Update
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="ticketContainer">
        <h2 className="ticketHeading">Manage Tickets</h2>
        <GridTable data={data} columns={columns} minHeight={"440px"} />
      </div>
    </>
  );
};

export default ManageTickets;
