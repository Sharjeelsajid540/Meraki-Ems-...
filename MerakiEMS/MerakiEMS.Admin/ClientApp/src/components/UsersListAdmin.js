import React, { useState, useMemo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { GridTable } from "./GridTable";
import { fetchAllAttendanceData , UpdateFineStatus , getLate} from "../Api/Api";
import "./css/UserListAdmin.css";
import { toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


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
      fineStatus:isFinePending,
    };

    

   
    getLate(params)
      .then((response) => {
        if (response) {
          setAttendanceData(response);
          // console.log(attendanceData);
        }
      })
      .catch((error) => {
   
        console.error('Error fetching data:', error);
      });

      

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
       setCount(count + 1);
       getLate(isLateFilter);
    
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
    }
  ];

  

  
  const handleSearch = () => {
    fetchData();
    setCount(count + 1);
   
  };

  useEffect(() => {
    fetchData(isLateFilter); 
  }, [isLateFilter,count]);

  useEffect(() => {
    fetchData(isFinePending); 
  }, [isFinePending,count]);

  const data = useMemo(() => attendanceData, [attendanceData]);

  return (
    <div className="admin-attendance">
      <Modal show={show} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton >
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
      <div className="container-1">
  <div className="row">
    <div className="col-sm-6 radio-button-btn">
      <label>
        <input
          type="radio"
          value="true"
          checked={isLateFilter === true}
          onChange={() =>{ setIsLateFilter(true)
             }}
        />
        &nbsp;
        Show Late Records
      </label>
      &nbsp;
      &nbsp;
      &nbsp;
      <label>
        <input
          type="radio"
          value="false"
          checked={isLateFilter === false}
          onChange={() => {setIsLateFilter(false)
      }}
        />
        &nbsp;
        Show All Records
      </label>

      &nbsp;
        &nbsp;
        <label>
          <input
            type="checkbox"
            value={isFinePending}
            checked={isFinePending}
            onChange={() => setIsFinePending(!isFinePending)}
          />
          &nbsp;
          Show Fine Pending
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
              />
            </Form.Group>
          </Form>
        </Col>

        <Col sm={2}>
          <Button className="btn-search" variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
    </div>
  </div>
</div>

      <GridTable className="grid" data={attendanceData} columns={columns} minHeight={"300px"} />
    </div>
  );
}

export default UsersListAdmin;
