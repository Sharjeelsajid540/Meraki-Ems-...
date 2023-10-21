import React, { useState, useMemo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { GridTable } from "./GridTable";
import { fetchAllAttendanceData , UpdateFineStatus} from "../Api/Api";
import "./css/UserListAdmin.css";
import { toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";


function UsersListAdmin() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [paidEntry, setPaidEntry] = useState([]);
  const [finePaid, setFinePaid] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isCount, setIsCount] = useState(0);
  
  function calculateTotalHours(timeString) {
    if (!timeString) {
      return 0; // Handle the case where timeString is undefined or empty
    }

    // Split the timeString by ':' and convert to hours
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Calculate the total hours
    const totalHours = hours + minutes / 60 + seconds / 3600;

    return totalHours;
  }

  // Define a function to apply conditional formatting based on total hours
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

    // Calculate total hours from the "HH:MM:SS" format (with error handling)
    const totalHours = calculateTotalHours(cellValue);

    // Calculate the CSS class based on the total hours
    const colorClass = getWorkingHoursColor(totalHours);

    return <span className={colorClass}>{cellValue}</span>;
  };

  const update = async (event) => {
    event.preventDefault();
    const data={
      id: paidEntry,
      finePaid: finePaid,
      
    }
   
    
    try {
      await UpdateFineStatus(data).then((result)=>{
        
        const errors = [];
        if (!finePaid) {
          errors.push("Please select Status.");
        }
      if(result.isRequestSuccessfull=="true"){
        toast.success("Request has been Updated");
        setPaidEntry(null);
        const errors = [];
        if (!finePaid) {
          errors.push("Please select Status.");
        }
       handleClose();
      fetchAllAttendanceData();
      setIsCount(isCount + 1);
      setFinePaid("");


      }
      else{
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
      header: "Hours Complete",
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
    }
  ];

  useEffect(() => {
    fetchAllAttendanceData().then((response) => {
      if (response) {
        setAttendanceData(response);
      }
    });
  }, [isCount]);

  const data = useMemo(() => attendanceData, [attendanceData]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton >
                <Modal.Title>Update Leave Request</Modal.Title>
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
                        <option value="Resolved">Resolved</option>
                      </Form.Control>
                    </Form.Group>
                  </Row>
                
                  <Button variant="secondary"  onClick={handleClose}>
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
          
      <h2 className="headingList">Employees Attendance List</h2>
      <GridTable data={data} columns={columns} minHeight={"300px"} />
    </div>
  );
}

export default UsersListAdmin;
