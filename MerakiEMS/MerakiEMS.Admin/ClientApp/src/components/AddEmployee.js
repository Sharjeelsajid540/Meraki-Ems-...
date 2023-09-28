import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./css/AddEmployee.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersListAdmin from "./UsersListAdmin";
import Modal from "react-bootstrap/Modal";

const AddEmployee = () => {
  const [roleNames, setRoleNames] = useState([]);
  const [managerNames, setManagerNames] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [contactno, setContactNo] = useState("");
  const [econtactno, setEContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [roleID, setRoleID] = useState("");
  const [managerID, setManagerID] = useState("");
  const [isChanged, setIsChanged] = useState(0);
  const [image, setImage] = useState("");

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [econtactNoError, setEContactNoError] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      cnic,
      contactno,
      econtactno,
      address,
      roleID,
      managerID,
      image,
    };

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters with a mix of lowercase and uppercase letters"
      );
      return;
    } else {
      setPasswordError("");
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

    if (roleID === "Admin") {
      data.roleID = 1;
    } else if (roleID === "User") {
      data.roleID = 2;
    } else {
      data.roleID = 3;
    }

    await axios
      .post("https://localhost:7206/api/User/AddUser", data)
      .then((result) => {
        if (result.data.isRequestSuccessful === true) {
          clear();
          toast.success("User has been Added");
          setShow(false);
        } else {
          toast.error(result.data.successResponse);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Session Expired!");

          navigate("/");
        } else {
          toast.error(error);
        }
      });
  };

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  };

  const validateCNIC = (cnic) => {
    return /^\d{5}-\d{7}-\d{1}$/.test(cnic);
  };

  const validateContactNo = (contactNo) => {
    return /^\d{4}-\d{7}$/.test(contactNo);
  };

  const clear = () => {
    setName("");
    setContactNo("");
    setEContactNo("");
    setCnic("");
    setEmail("");
    setPassword("");
    setRoleID("");
    setManagerID("");
    setAddress("");
  };

  useEffect(() => {
    getRoles();
    getManagers();
  }, []);

  const getManagers = async () => {
    await axios
      .get("https://localhost:7206/api/User/ManagerList")
      .then((result) => {
        localStorage.setItem("ManagersData", JSON.stringify(result.data));
        setIsChanged(isChanged + 1);
      });
  };
  const getManagerNamesFromLocalStorage = () => {
    const managerNames = localStorage.getItem("ManagersData");

    return managerNames ? JSON.parse(managerNames) : [];
  };

  const getRoles = async () => {
    await axios
      .get("https://localhost:7206/api/User/UserRole")
      .then((result) => {
        localStorage.setItem("RolesData", JSON.stringify(result.data));
        setIsChanged(isChanged + 1);
      });
  };
  const getRoleNamesFromLocalStorage = () => {
    const roleNames = localStorage.getItem("RolesData");

    return roleNames ? JSON.parse(roleNames) : [];
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

  useEffect(() => {
    const storedRoleNames = getRoleNamesFromLocalStorage();
    setRoleNames(storedRoleNames);

    const storedManagerNames = getManagerNamesFromLocalStorage();
    setManagerNames(storedManagerNames);
  }, [isChanged]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="CustomerPage">
      <div className="addEmployee">
        <Button
          variant="secondary"
          className="secondary-btn"
          onClick={handleShow}
        >
          Add Employee
        </Button>
        <UsersListAdmin />
        <br />

        <Modal show={show} onHide={handleClose} centered={true} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mt-1">
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className="form-label-addUser">Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="form-label-addUser">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </Form.Group>
                </div>
              </Row>

              <Row className="mt-1">
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label className="form-label-addUser">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridCNIC">
                    <Form.Label className="form-label-addUser">CNIC</Form.Label>
                    <Form.Control
                      type="cnic"
                      placeholder="xxxxx-xxxxxxx-x"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      required
                    />
                    {cnicError && (
                      <div className="error-message">{cnicError}</div>
                    )}
                  </Form.Group>
                </div>
              </Row>

              <Row className="mt-1">
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridContactNo">
                    <Form.Label className="form-label-addUser">
                      Cotact No
                    </Form.Label>
                    <Form.Control
                      type="phoneno"
                      placeholder="xxxx-xxxxxxx"
                      value={contactno}
                      onChange={(e) => setContactNo(e.target.value)}
                      required
                    />
                    {contactNoError && (
                      <div className="error-message">{contactNoError}</div>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridEContactNo">
                    <Form.Label className="form-label-addUser">
                      Emergency Contact No
                    </Form.Label>
                    <Form.Control
                      type="ephoneno"
                      placeholder="xxxx-xxxxxxx"
                      value={econtactno}
                      onChange={(e) => setEContactNo(e.target.value)}
                      required
                    />
                    {econtactNoError && (
                      <div className="error-message">{econtactNoError}</div>
                    )}
                  </Form.Group>
                </div>
              </Row>

              <Row className="mt-1">
                <div className="col-md-12">
                  <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label className="form-label-addUser">
                      Address
                    </Form.Label>
                    <Form.Control
                      type="address"
                      placeholder="Enter your Current Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </Row>

              <Row className="mt-1">
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">Role</Form.Label>
                    <Form.Select
                      value={roleID}
                      onChange={(e) => setRoleID(e.target.value)}
                      required
                    >
                      {roleNames.map((role) => (
                        <option key={role.id}>{role.roleName}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      Manager
                    </Form.Label>
                    <Form.Select
                      value={managerID}
                      onChange={(e) => setManagerID(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Manager
                      </option>
                      {managerNames.map((role) => (
                        <option key={role.managerID} value={role.managerID}>
                          {role.managerName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </Row>
              <Row className="mt-1">
                <div className="col-md-4 ">
                  <Form.Group className="mt-4" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                </div>
                <div className="col-md-6 offset-2">
                  <Form.Group as={Col} controlId="formGridImage">
                    <Form.Label className="form-label-addUser"></Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {fileSizeError && (
                      <div className="error-message">{fileSizeError}</div>
                    )}
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
    </div>
  );
};

export default AddEmployee;
