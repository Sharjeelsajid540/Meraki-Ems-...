import React, { useState, useMemo, useEffect } from "react";
import { SideNavbar } from "./SideNavbar";
import { Profile } from "./Profile";
import "./css/EmployeeList.css";
import { GridTable } from "./GridTable";
import { deleteUser, fetchAllUsersData } from "../Api/Api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { updateUsersData } from "../Api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EmployeesList = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee data
  const [showModal, setShowModal] = useState(false);

  const [roleNames, setRoleNames] = useState([]);
  const [userID, setUserID] = useState([]);
  const [managerNames, setManagerNames] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [image, setImage] = useState("");
  const [cnic, setCnic] = useState("");
  const [contactno, setContactNo] = useState("");
  const [econtactno, setEContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [roleID, setRoleID] = useState();

  const [managerID, setManagerID] = useState();

  const [isChanged, setIsChanged] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [econtactNoError, setEContactNoError] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");

  const showDetails = (employee) => {
    setSelectedEmployee(employee.row.original); // Set the selected employee data
    setShowModal(true); // Show the modal
    setName(employee.row.original.name);
    setEmail(employee.row.original.email);
    setCnic(employee.row.original.cnic);
    setContactNo(employee.row.original.contactNo);
    setEContactNo(employee.row.original.eContactNo);
    setAddress(employee.row.original.address);
    setRoleID(employee.row.original.roleID);

    setManagerID(employee.row.original.managerID);

    setUserID(employee.row.original.userID);
    setImage(employee.row.original.image);
  };

  const columns = [
    {
      header: "Employee ID",
      accessorKey: "userID",
    },
    {
      header: "Name",
      accessorKey: "name",
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
      header: "Role",
      accessorKey: "role",
    },
    {
      header: " ",
      accessorKey: " ",
      cell: (employee) => (
        <Button
          className="viewDetails"
          variant="secondary"
          onClick={() => showDetails(employee)} // Call the showDetails function with the employee data
        >
          View Details
        </Button>
      ),
    },
  ];
  const getRoleNamesFromLocalStorage = () => {
    const roleNames = localStorage.getItem("RolesData");

    return roleNames ? JSON.parse(roleNames) : [];
  };
  const getManagerNamesFromLocalStorage = () => {
    const managerNames = localStorage.getItem("ManagersData");

    return managerNames ? JSON.parse(managerNames) : [];
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      id: userID,
      name,
      email,
      image,
      cnic,
      contactno,
      econtactno,
      address,
      roleID,
      managerID,
    };

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    if (!validateCNIC(cnic)) {
      setCnicError("Invalid CNIC format. Use xxxxx-xxxxxxx-x");
      return;
    } else {
      setCnicError("");
    }

    if (!validateContactNo(contactno)) {
      setContactNoError("Invalid contact no format. Use xxxx-xxxxxxx");
      return;
    } else {
      setContactNoError("");
    }

    if (!validateContactNo(econtactno)) {
      setEContactNoError(
        "Invalid emergency contact no format. Use xxxx-xxxxxxx"
      );
      return;
    } else {
      setEContactNoError("");
    }

    updateUsersData(data).then((response) => {
      if (response.isSuccess == true) {
        toast.success("User Updated Successfully");
        setShowModal(false);
        setIsChanged(isChanged + 1);
        setIsDisabled(true);
      } else {
        toast.error(response.successResponse);
      }
    });
  };

  const confirmDelete = () => {
    deleteUser(userID).then((response) => {
      if (response.isSuccess === true) {
        toast.success("User Deleted Successfully");
        setShowModal(false);
        setIsChanged(isChanged + 1);
      } else {
        toast.error(response.successResponse);
      }
      setShowDeleteModal(false); // Close the confirmation modal
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };
  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    fetchAllUsersData().then((response) => {
      if (response) {
        setUsersData(response);
      }
    });

    const storedRoleNames = getRoleNamesFromLocalStorage();
    setRoleNames(storedRoleNames);

    const storedManagerNames = getManagerNamesFromLocalStorage();
    setManagerNames(storedManagerNames);
  }, [isChanged]);

  const data = useMemo(() => usersData, [usersData]);

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateCNIC = (cnic) => {
    return /^\d{5}-\d{7}-\d{1}$/.test(cnic);
  };

  const validateContactNo = (contactNo) => {
    return /^\d{4}-\d{7}$/.test(contactNo);
  };

  const handleEdit = () => {
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const maxFileSize = 500 * 1024;
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxFileSize) {
        setFileSizeError(" Maximum allowed size (500KB).");
        e.target.value = null;
        return;
      } else {
        setFileSizeError("");
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1];
        setImage(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <SideNavbar />
        <Profile />
        <div className="employeeList">
          <h1>Employees List</h1>

          <GridTable data={data} columns={columns} minHeight={"450px"} />
        </div>
        {/* Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered={true}
          size={"xl"}
        >
          <Modal.Header closeButton>
            <Modal.Title>Employee Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <div className="userImage2">
                {image && (
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt="User's Profile"
                    className="profileImage2"
                  />
                )}
                <Form.Group as={Col} controlId="formGridImage">
                  <Form.Label className="form-label-addUser"></Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    disabled={isDisabled}
                    onChange={handleImageChange}
                  />
                  {fileSizeError && (
                    <div className="error-message">{fileSizeError}</div>
                  )}
                </Form.Group>
              </div>
              <Row className="mt-1">
                <div className="col-md-4 offset-4">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className="form-label-addUser">Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isDisabled}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="form-label-addUser">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isDisabled}
                      required
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </Form.Group>
                </div>
              </Row>

              <Row className="mt-1">
                <div className="col-md-4 offset-4">
                  <Form.Group as={Col} controlId="formGridCNIC">
                    <Form.Label className="form-label-addUser">CNIC</Form.Label>
                    <Form.Control
                      type="cnic"
                      placeholder="xxxxx-xxxxxxx-x"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      disabled={isDisabled}
                      required
                    />
                    {cnicError && (
                      <div className="error-message">{cnicError}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  <Form.Group as={Col} controlId="formGridContactNo">
                    <Form.Label className="form-label-addUser">
                      Cotact No
                    </Form.Label>
                    <Form.Control
                      type="phoneno"
                      placeholder="xxxx-xxxxxxx"
                      value={contactno}
                      onChange={(e) => setContactNo(e.target.value)}
                      disabled={isDisabled}
                      required
                    />
                    {contactNoError && (
                      <div className="error-message">{contactNoError}</div>
                    )}
                  </Form.Group>
                </div>
              </Row>

              <Row className="mt-1">
                <div className="col-md-3 offset-4">
                  <Form.Group as={Col} controlId="formGridEContactNo">
                    <Form.Label className="form-label-addUser">
                      Emergency Contact No
                    </Form.Label>
                    <Form.Control
                      type="ephoneno"
                      placeholder="xxxx-xxxxxxx"
                      value={econtactno}
                      onChange={(e) => setEContactNo(e.target.value)}
                      disabled={isDisabled}
                      required
                    />
                    {econtactNoError && (
                      <div className="error-message">{econtactNoError}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-5">
                  <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label className="form-label-addUser">
                      Address
                    </Form.Label>
                    <Form.Control
                      type="address"
                      placeholder="Enter your Current Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={isDisabled}
                      required
                    />
                  </Form.Group>
                </div>
              </Row>
              <Row className="mt-1">
                <div className="col-md-3 offset-4">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">Role</Form.Label>
                    <Form.Select
                      value={roleID}
                      onChange={(e) => setRoleID(e.target.value)}
                      disabled={isDisabled}
                      required
                    >
                      {roleNames.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.roleName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      Manager
                    </Form.Label>
                    <Form.Select
                      value={managerID}
                      onChange={(e) => setManagerID(e.target.value)}
                      disabled={isDisabled}
                      required
                    >
                      {managerNames.map((role) => (
                        <option key={role.managerID} value={role.managerID}>
                          {role.managerName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </Row>

              <Form.Group className="mt-4 offset-4" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Row className="mt-1">
                <div className="col-md-3">
                  <Button
                    variant="outline-secondary"
                    className="addBtn1"
                    onClick={handleEdit}
                  >
                    {isDisabled ? "Edit" : "Cancel Edit"}
                  </Button>
                </div>
                <div className="col-md-3 offset-3">
                  <Button
                    variant="outline-secondary"
                    type="submit"
                    className="addBtn1"
                    disabled={isDisabled}
                  >
                    Update
                  </Button>
                </div>
                <div className="col-md-3">
                  <Button
                    variant="outline-danger"
                    className="addBtn2"
                    onClick={handleDelete}
                  >
                    Delete Employee
                  </Button>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showDeleteModal} onHide={cancelDelete} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this employee?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
