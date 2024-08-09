import React, { useState, useMemo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { GridTable } from "./GridTable";
import {
  fetchAllAttendanceData,
  UpdateFineStatus,
  getLate,
  GenerateAttendanceExcel,
  getAllUsers,
} from "../Api/Api";
import "./css/UserListAdmin.css";
import { toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Select from "react-select";

function UsersListAdmin() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLateFilter, setIsLateFilter] = useState(true);
  const [paidEntry, setPaidEntry] = useState([]);
  const [finePaid, setFinePaid] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [isFinePending, setIsFinePending] = useState(false);
  const [fromsearchDate, setFromSearchDate] = useState("");
  const [tosearchDate, setToSearchDate] = useState("");
  const [usersname, setUsersName] = useState("");
  const [username, setUserName] = useState("");
  const [allUsersData, setAllUersData] = useState({});

  const [shows, setShows] = useState(false);
  const handleClosed = () => setShows(false);
  const handleShows = () => setShows(true);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (response) {
          console.log("Users Name:", response);
          setAllUersData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function calculateTotalHours(timeString) {
    if (!timeString) {
      return 0;
    }

    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const totalHours = hours + minutes / 60 + seconds / 3600;

    return totalHours;
  }

  function getWorkingHoursColor(workingHours) {
    if (workingHours < 8.5) {
      return "red";
    } else if (workingHours >= 8.5 && workingHours < 9) {
      return "orange";
    } else {
      return "green";
    }
  }

  const renderWorkingHoursCell = (cell) => {
    const cellValue = cell.getValue();

    const totalHours = calculateTotalHours(cellValue);

    const colorclassName = getWorkingHoursColor(totalHours);

    return <span className={colorclassName}>{cellValue}</span>;
  };
  const fetchData = (filterType) => {
    const dateParameter = searchDate === "" ? null : searchDate;
    const nameParameter = searchText === "" ? null : searchText;

    const params = {
      isLateFilter: filterType,
      name: nameParameter,
      date: dateParameter,
      fineStatus: isFinePending,
    };

    //  console.log(nameParameter);

    getLate(params)
      .then((response) => {
        if (response) {
          setAttendanceData(response);
          // console.log(attendanceData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const update = async (event) => {
    event.preventDefault();
    const data = {
      id: paidEntry,
      finePaid: finePaid,
    };

    try {
      await UpdateFineStatus(data).then((result) => {
        const errors = [];
        if (!finePaid) {
          errors.push("Please select Status.");
        }
        if (result.isRequestSuccessfull == "true") {
          toast.success("Request has been Updated");
          setPaidEntry(null);
          const errors = [];
          if (!finePaid) {
            errors.push("Please select Status.");
          }
          handleClose();
          setCount(count + 1);
          getLate(isLateFilter);

          setFinePaid("");
        } else {
          toast.error("Something went wrong.");
          handleClose();
          setPaidEntry(null);
          setFinePaid("");
        }
      });
    } catch (err) {
      toast.error("Error occurred!");
    }
  };

  const columns = [
    {
      header: "Date",
      accessorKey: "createdAt",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "CheckIn Time",
      accessorKey: "checkInTime",
    },
    {
      header: "CheckOut Time",
      accessorKey: "checkOutTime",
    },
    {
      header: "Working Hours",
      accessorKey: "workingHours",
      cell: renderWorkingHoursCell,
    },
    {
      header: "Hours Completed",
      accessorKey: "isHourCompleted",
      cell: (value) => (
        <strong>
          <span
            style={{
              color: value.getValue("isHourCompleted") ? "green" : "red",
            }}
          >
            {value.getValue("isHourCompleted") ? "Yes" : "No"}
          </span>
        </strong>
      ),
    },

    {
      header: "Is Late",
      accessorKey: "isLate",
      cell: (value) => (
        <strong>
          <span style={{ color: value.getValue("isLate") ? "red" : "green" }}>
            {value.getValue("isLate") ? "Yes" : "NO"}
          </span>
        </strong>
      ),
    },
    {
      header: "Fine Paid",
      accessorKey: "finePaid",
    },
    {
      header: "Paid Date",
      accessorKey: "paidDate",
    },
    {
      header: " ",
      accessorKey: " ",
      cell: (entry) =>
        entry.row.original.isLate == true ? (
          <button
            className="secondary-btn-respond"
            variant="success"
            onClick={() => {
              setPaidEntry(entry.row.original.id);

              handleShow();
            }}
          >
            Action
          </button>
        ) : (
          " "
        ),
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSearch();
    }
  };

  const handleExcelDataPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const options = Array.isArray(allUsersData)
    ? allUsersData.map((user) => ({
      value: user.userName,
      label: user.userName,
    }))
    : [];
  const handledChange = (selectedOptions) => {
    setUsersName(selectedOptions);
  };

  const handleSearch = () => {
    fetchData();
    setCount(count + 1);
  };
  const handleSearchExcelData = (e) => {
    e.preventDefault();

    const data = {
      fromDate: fromsearchDate,
      toDate: tosearchDate,
      name: usersname,
    };

    GenerateAttendanceExcel(data)
      .then((response) => {
        if (response) {
          // Convert base64 to Blob
          const blob = base64toBlob(response);

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = "attendance.xlsx";

          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          console.error("No data found for generating Excel.");
        }
      })
      .catch((error) => {
        console.error("Error generating Excel:", error);
      });
  };

  function base64toBlob(base64) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  }

  useEffect(() => {
    fetchData(isLateFilter);
    fetchData(isLateFilter);
  }, [isLateFilter, count]);

  useEffect(() => {
    fetchData(isFinePending);
  }, [isFinePending, count]);

  const data = useMemo(() => attendanceData, [attendanceData]);

  return (
    <div className="admin-attendance">
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Fine Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={update}>
            <Row className="mt-3">
              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  value={finePaid}
                  onChange={(e) => setFinePaid(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Ignored">Ignore</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            &nbsp; &nbsp;
            <Button
              className="secondary-btn-respond"
              variant="success"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h2 className="headingList">
        Employees Attendance List
        <div className="Employee-exceldata-check">
          <Row>
            {/* <Col sm={4}>
              <Form>
                <Form.Group>
                  <Form.Control
                    className="Date-field"
                    type="date"
                    value={fromsearchDate}
                    onChange={(e) => setFromSearchDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>

            <Col sm={4}>
              <Form>
                <Form.Group>
                  <Form.Control
                    className="Date-field"
                    type="date"
                    value={tosearchDate}
                    onChange={(e) => setToSearchDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col> */}

            <Col sm={4}>
              <Button
                className="exceldata-btn"
                variant=""
                onClick={() => {
                  // handleSearchExcelData();
                  handleShows();
                }}
              >
                Excel Sheet
              </Button>
            </Col>
          </Row>
        </div>
      </h2>

      <div className="container-1">
        <div className="row">
          <div className="col-sm-6 radio-button-btn">
            <label>
              <input
                type="radio"
                value="true"
                checked={isLateFilter === true}
                onChange={() => {
                  setIsLateFilter(true);
                }}
              />
              &nbsp; Show Late Records
            </label>
            &nbsp; &nbsp; &nbsp;
            <label>
              <input
                type="radio"
                value="false"
                checked={isLateFilter === false}
                onChange={() => {
                  setIsLateFilter(false);
                }}
              />
              &nbsp; Show All Records
            </label>
            &nbsp; &nbsp;
            <label>
              <input
                type="checkbox"
                value={isFinePending}
                checked={isFinePending}
                onChange={() => setIsFinePending(!isFinePending)}
              />
              &nbsp; Show Fine Pending
            </label>
          </div>

          <div className="col-sm-6 search-form">
            <Row>
              <Col sm={5}>
                <Form>
                  <Form.Group>
                    <Form.Control
                      className="fields"
                      type="text"
                      placeholder="Enter name to search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={5}>
                <Form>
                  <Form.Group>
                    <Form.Control
                      className="fields"
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={2}>
                <Button
                  className="btn-search"
                  variant="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <GridTable
        className="grid"
        data={attendanceData}
        columns={columns}
        minHeight={"300px"}
      />
      <Modal show={shows} onHide={handleClosed} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSearchExcelData}>
            <Row className="mt-3">
              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Col sm={4}>
              <Form>
                <Form.Group>
                  <Form.Control
                    className="Date-field"
                    type="date"
                    value={fromsearchDate}
                    onChange={(e) => setFromSearchDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col sm={4}>
              <Form>
                <Form.Group>
                  <Form.Control
                    className="Date-field"
                    type="date"
                    value={tosearchDate}
                    onChange={(e) => setToSearchDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            &nbsp; &nbsp;
            <Button
              className="secondary-btn-respond"
              variant="success"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={shows} onHide={handleClosed} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Download Attendance Sheet </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mt-3">
              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label>Name</Form.Label>
                <Select
                  isMulti
                  options={options}
                  value={usersname}
                  onChange={handledChange}
                />
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  className="Date-field"
                  type="date"
                  value={fromsearchDate}
                  onChange={(e) => setFromSearchDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  className="Date-field"
                  type="date"
                  value={tosearchDate}
                  onChange={(e) => setToSearchDate(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Button variant="secondary" onClick={handleClosed}>
              Close
            </Button>
            &nbsp; &nbsp;
            <Button
              className="your-class-name"
              variant="your-variant"
              onClick={handleSearchExcelData}
            >
              Download
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UsersListAdmin;
