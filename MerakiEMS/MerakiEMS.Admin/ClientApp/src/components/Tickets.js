import React, { useState, useEffect, useMemo } from "react";
import { SideNavbar } from "./SideNavbar";
import { Profile } from "./Profile";
import "./css/Tickets.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { addTicket } from "../Api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTicket } from "../Api/Api";
import { GridTable } from "./GridTable";

const Tickets = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [ticketData, setTicketData] = useState("");
  const [isChanged, setIsChanged] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = localStorage.getItem("loginData");
  var userData = JSON.parse(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      category,
      priority,
      requesterID: userData.id,
      requesterName: userData.name,
      status: "pending",
      reviewer: "null",
    };

    await addTicket(data).then((result) => {
      if (result.isRequestSuccessfull == true) {
        toast.success(result.successMessage);
        setShow(false);
        setIsChanged(isChanged + 1);
      } else {
        toast.error(result.successMessage);
      }
    });
  };

  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
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
          className={`statusDiv  ${ticket.row.original.status.toLowerCase()}`}
        >
          {ticket.row.original.status}
        </div>
      ),
    },
  ];

  useEffect(() => {
    var id = userData.id;
    getTicket(id).then((response) => {
      if (response) {
        setTicketData(response);
      }
    });
  }, [isChanged]);
  const data = useMemo(() => ticketData, [ticketData]);

  return (
    <>
      <SideNavbar />
      <Profile />
      <div className="containerTicket">
        <Button variant="secondary" className="ticketBtn" onClick={handleShow}>
          Add Ticket
        </Button>
        <h2 className="headingTicket">My Tickets</h2>
        <GridTable data={data} columns={columns} />
        <Modal show={show} onHide={handleClose} centered={true} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>Add Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mt-1">
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className="form-label-addUser">
                      Title
                    </Form.Label>
                    <Form.Control
                      type="title"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      Category
                    </Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option>Hardware</option>
                      <option>Software</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Row>
              <Row className="mt-1">
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="form-label-addUser">
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: "200px" }}
                      placeholder="write description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      Priority
                    </Form.Label>
                    <Form.Select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Priority
                      </option>

                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Row>

              <Button variant="primary" type="submit" className="addBtn">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Tickets;
