import React, { useState, useMemo, useEffect, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { SideNavbar } from "./SideNavbar";
import { Profile } from "./Profile";
import { GridTable } from "./GridTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/InterviewsData.css";
import ReactStars from "react-rating-star-with-type";
import { useForm } from "react-hook-form";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  fetchInterData,
  AddInterviewCandidate,
  updateCandidateData,
  DeleteCandidateData,
  ShowCvCandidate,
} from "../Api/Api";

const InterviewData = () => {
  const [isDataFilter, setisDataFilter] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Do something with the form data
  };
  // const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };
  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];
  const handleProcedureContentChange = (content) => {
    // Remove <p> tags from the content
    const contentWithoutPTag = content.replace(/<\/?p>/g, "");

    console.log("content without p tag ---->", contentWithoutPTag);
    setComment(contentWithoutPTag);
  };
  const handleProcedureContentChanged = (content) => {
    // Remove <p> tags from the content
    const contentWithoutPTag = content.replace(/<\/?p>/g, "");

    console.log("content without p tag ---->", contentWithoutPTag);
    setComments(contentWithoutPTag);
  };

  const [Email, setEmail] = useState("");
  const [Emails, setEmails] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [contactsNo, setContactsNo] = useState("");
  const [experience, setExperience] = useState("");
  const [experiences, setExperiences] = useState("");
  const [status, setStatus] = useState("");
  const [statuss, setStatuss] = useState("");
  const [language, setprogLanguage] = useState("");
  const [languages, setprogLanguages] = useState("");
  const [updateShow, setUpdateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [cvShow, setCvShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNames, setUserNames] = useState("");
  const [rating, setRating] = useState("");
  const [allrating, setAllRating] = useState("");
  const [allratings, setAllRatings] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [ProfessionalAttitude, setProfessional] = useState("0");
  const [ratings, setRatings] = useState("");
  const [disciplines, setDisciplines] = useState("");
  const [ProfessionalsAttitudes, setProfessionals] = useState("");

  const [searchText, setSearchText] = useState("");

  const [date, setDate] = useState("");
  const [dates, setDates] = useState("");

  const [comments, setComments] = useState("");
  const [comment, setComment] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [File, setPdf] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");

  const [count, setCount] = useState(0);
  const [performanceID, setPerformanceID] = useState();
  const [id, setPerformancID] = useState();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSearch();
    }
  };
  const handleSearch = () => {
    fetchinterviewData();
  };

  //  const maxFileSize = 500 * 1024;
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     if (file.size > maxFileSize) {
  //       setFileSizeError(" Maximum allowed size (500KB).");
  //       e.target.value = null;
  //       return;
  //     } else {
  //       setFileSizeError("");
  //     }
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       const base64Image = reader.result.split(",")[1];
  //       setImage(base64Image);
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const OverallratingChanged = (newRating) => {
    setAllRating(newRating);
  };
  const OverallratingsChanged = (newRating) => {
    setAllRatings(newRating);
  };

  const disciplineChanged = (newRating) => {
    setDiscipline(newRating);
  };
  const professionalAttitudeChanged = (newRating) => {
    setProfessional(newRating);
  };
  const ratingsChanged = (newRating) => {
    setRatings(newRating);
  };
  const disciplinesChanged = (newRating) => {
    setDisciplines(newRating);
  };
  const professionalsAttitudeChanged = (newRating) => {
    setProfessionals(newRating);
  };

  const handleUpdateShow = () => setUpdateShow(true);
  const handleUpdateClose = () => setUpdateShow(false);

  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const navigate = useNavigate();

  const fetchinterviewData = async (filterType) => {
    const nameParameter = searchText === "" ? null : searchText;

    const params = {
      isDataFilter: filterType,
      Name: nameParameter,
    };

    fetchInterData(isDataFilter, searchText)
      .then((response) => {
        if (response) {
          console.log("dskfcsfc", response);
          setPerformanceData(response);
          setRatingCount(response.rating);
          // console.log(attendanceData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Add logic to handle form submission
  //   };
  const handleSubmits = async (e) => {
    // console.log("dfefrefd");
    e.preventDefault();
    // Disable the submit button.
    // e.target.disabled = true;
    // const errors = [];
    // if (!userNames) {
    //   errors.push("Please enter a ApplicantName.");
    // }
    // if (!Emails) {
    //   errors.push("Please select email.");
    // }
    // if (!comments) {
    //   errors.push("Please enter comments.");
    // }
    // if (errors.length > 0) {
    //   e.target.disabled = false;
    //   return;
    // }

    const data = {
      employeeName: userNames,
      Email: Emails,
      contactNo: contactsNo,
      comments: comment,
      Date: date,
      File: File,
      Rating: rating.toString(),
      OverallRating: allrating.toString(),
      Status: status,
      Experience: experience,
      ProgrammingLanguage: language,
      Discipline: discipline.toString(),
      ProfessionalAttitude: ProfessionalAttitude.toString(),
    };
    try {
      const response = await AddInterviewCandidate(data);
      if (response.isRequestSuccessful === true) {
        toast.success("Applicant Added");
        console.log("I am inside if");

        clear();
        handleClose();
        fetchinterviewData();
      } else if (response.isRequestSuccessful === false) {
        console.log("I am inside else");
        toast.error("Something went wrong!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session Expired!");
        navigate("/");
      } else {
        toast.error(error);
      }
    } finally {
      e.target.disabled = false;
    }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    const data = {
      performanceID: performanceID,
      employeeName: userName,
      contactNo: contactNo,
      Email: Email,
      comments: comments,
      Date: dates,
      File: File,
      Rating: ratings.toString(),
      Discipline: disciplines.toString(),
      ProfessionalAttitude: ProfessionalsAttitudes.toString(),
    };
    try {
      await updateCandidateData(data).then((response) => {
        if (response.isRequestSuccessful) {
          toast.success("Updated Data Successfully");
          clear();
          fetchinterviewData();
          handleUpdateClose();
          setCount(count + 1);
        } else {
          toast.error("Failed to Updated Data");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDeleteData = async (e) => {
    console.log("nccnncncn");
    e.preventDefault();

    console.log("nccnncncn");
    try {
      await DeleteCandidateData(id).then((response) => {
        if (response.isRequestSuccessful) {
          toast.success("DeleteCandidate Successfully");
          clear();
          fetchinterviewData();
          handleDeleteClose();
          setCount(count + 1);
        } else {
          toast.error("Failed to Delete Candidate");
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const showDetails = (data) => {
    console.log("data :", data);
    setUserName(data.row.original.employeeName);
    setEmail(data.row.original.email);
    setContactNo(data.row.original.contactNo);
    setComments(data.row.original.comments);
    setDates(data.row.original.date);
    setUpdateShow(true);
    setPerformanceID(data.row.original.id);
    setRatings(data.row.original.rating);
    setDisciplines(data.row.original.discipline);
    setProfessionals(data.row.original.professionalAttitude);
    setAllRatings(data.row.original.overallRating);
    setExperiences(data.row.original.experience);
    setprogLanguages(data.row.original.programmingLanguage);
    setStatuss(data.row.original.setStatuss);
  };
  const showDetail = (data) => {
    setEmail(data.row.original.email);
    setComments(data.row.original.comments);
    setDate(data.row.original.specifiedDate);
    setDeleteShow(true);
    setPerformancID(data.row.original.id);
  };

  const showDetailed = async (data) => {
    try {
      const response = await ShowCvCandidate(data.row.original.id);

      if (response.file) {
        const base64PDFData = response.file;
        const decodedData = atob(base64PDFData);
        const uint8Array = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
          uint8Array[i] = decodedData.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);

        const printWindow = window.open(
          pdfUrl,
          "Print",
          "width=800, height=800"
        );

        if (!printWindow) {
          alert(
            "Popup blocker is preventing the print window from opening. Please disable it."
          );
        }
      } else {
        toast.error("Failed showCV", { id: "1" });
      }
    } catch (error) {
      toast.error("An error occurred while fetching CV: " + error.message);
    }
  };
  const test = () => {
    console.log("ajsdhoaskhdsadhalsd");
  };

  const maxFileSize = 500 * 1024;

  const handlePdfChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxFileSize) {
        setFileSizeError("Maximum allowed size (500KB).");
        e.target.value = null;
        return;
      } else {
        setFileSizeError("");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Pdf = reader.result.split(",")[1];
        setPdf(base64Pdf);
      };

      reader.readAsDataURL(file);
    }
  };

  const clear = () => {
    setEmails("");
    setComment("");
    setUserNames("");
    setContactsNo("");
    setDate("");
    setRating("");
    setDiscipline("");
    setProfessional("");
    setExperience("");
    setAllRating("");
    setStatus("");
    setprogLanguage("");
  };

  useEffect(() => {
    fetchinterviewData();
  }, []);

  const columns = [
    {
      header: " Name",
      accessorKey: "employeeName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Contact NO",
      accessorKey: "contactNo",
    },
    {
      header: "Experience",
      accessorKey: "experience",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Programming Language",
      accessorKey: "programmingLanguage",
    },
    // {
    //   header: "",
    //   accessorKey: "specifiedDate",
    // },
    {
      header: "Interview Date",
      accessorKey: "date",
    },

    {
      header: "Technical skill",
      accessorKey: "rating",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.rating}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },

    {
      header: "Discipline",
      accessorKey: "discipline",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.discipline}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },
    {
      header: "professionalAttitude",
      accessorKey: "professionalAttitude",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.professionalAttitude}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },

    {
      header: "",
      accessorKey: " ",
      cell: (data) => (
        <Button
          className="action"
          variant="outline-secondary"
          onClick={() => showDetails(data)} // Call the showDetails function with the employee data
        >
          Update
        </Button>
      ),
    },
    {
      header: "",
      accessorKey: " ",
      cell: (data) => (
        <Button
          className="action"
          variant="outline-secondary"
          onClick={() => showDetail(data)} // Call the showDetails function with the employee data
        >
          Delete
        </Button>
      ),
    },
    {
      header: "",
      accessorKey: " ",
      cell: (data) => (
        <Button
          className="actions"
          variant="outline-secondary"
          onClick={() => showDetailed(data)}
        >
          View CV
        </Button>
      ),
    },
    {
      header: "Overall Rating",
      accessorKey: "overallRating",
      cell: (data) => (
        <div>
          <ReactStars
            value={data.row.original.overallRating}
            size={15}
            isHalf={true}
            color="#0b2b50"
            activeColors={[
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
              "#FFCE00",
            ]}
            edit={false}
          />
        </div>
      ),
    },
  ];
  const data = useMemo(() => performanceData, [performanceData]);
  return (
    <div>
      <SideNavbar />
      <Profile />

      <div>
        <br />
        <br />
        <Modal show={show} onHide={handleClose} backdrop="static" className="">
          {/* <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="inputField">Input Field:</label>
      <input
        type="text"
        id="inputField"
        {...register('inputField', { required: true })}
      />
      <button type="submit">Submit</button>
    </form> */}
          <Modal.Header closeButton>
            <Modal.Title>Add Interview Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmits}>
              <Row className="mt-3">
                <Col>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser add-modal">
                      Applicant Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={userNames}
                      onChange={(e) => setUserNames(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder=" example@gamil.com"
                      value={Emails}
                      onChange={(e) => setEmails(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Group controlId="formGridStatus">
                    <Form.Label> Interview Date</Form.Label>
                    <Form.Control
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="date"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="form-label-addUser">
                      ContactNo
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter ContactNo"
                      type="contact"
                      value={contactsNo}
                      onChange={(e) => setContactsNo(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                {/* <Col>
                  <Form.Group controlId="formGridStatus">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="date"
                    />
                  </Form.Group>
                </Col> */}
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      placeholder="Enter Experience"
                      type="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Status
                      </option>
                      <option value="Good">Good</option>
                      <option value="Normal">Normal</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Bad">Bad</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Programming Language</Form.Label>
                    <Form.Control
                      as="select"
                      value={language}
                      onChange={(e) => setprogLanguage(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                        select
                      </option>
                      <option value="Dot.NET">Dot.NET</option>
                      <option value="LARAVE">LARAVEL</option>
                      <option value="REACT">REACT</option>
                      <option value="FLUTTER">FLUTTER</option>
                      <option value="FULL STACK">FULL STACK</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Rating</Form.Label>
                  {}
                  <ReactStars
                    count={5}
                    size={15}
                    isEdit={true}
                    activeColors={[
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                    ]}
                    value={rating}
                    onChange={ratingChanged}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Discipline</Form.Label>
                  {}
                  <ReactStars
                    count={5}
                    size={15}
                    isEdit={true}
                    activeColors={[
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                    ]}
                    value={discipline}
                    onChange={disciplineChanged}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>ProfessionalAttitude</Form.Label>
                  {}
                  <ReactStars
                    count={5}
                    size={15}
                    isEdit={true}
                    activeColors={[
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                      "#FFCE00",
                    ]}
                    value={ProfessionalAttitude}
                    onChange={professionalAttitudeChanged}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-3">
                <Col>
                  <div>
                    <h1 style={{ textAlign: "center" }}>Comments</h1>
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="write your content ...."
                        onChange={handleProcedureContentChange}
                        style={{ height: "200px" }}
                      ></ReactQuill>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="pdf-div">
                <Col>
                  <Form.Group as={Col} controlId="formGridImage">
                    <Form.Label className="form-label-addUser">
                      PDF File:
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfChange}
                    />
                    {fileSizeError && (
                      <div className="error-message">{fileSizeError}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Overall Rating</Form.Label>
                    {}
                    <ReactStars
                      count={5}
                      size={15}
                      isEdit={true}
                      activeColors={[
                        "#FFCE00",
                        "#FFCE00",
                        "#FFCE00",
                        "#FFCE00",
                        "#FFCE00",
                      ]}
                      value={allrating}
                      onChange={OverallratingChanged}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="addBtn">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={updateShow} onHide={handleUpdateClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Update Interview Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateData}>
              <Row className="mt-3">
                <Col>
                  <Form.Group as={Col} controlId="formGridState ">
                    <Form.Label className="form-label-addUse add-modal">
                      Applicant Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      defaultValue={userName}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      defaultValue={Email}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Group as={Col} controlId="formGridContact">
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setContactNo(e.target.value)}
                      required
                      defaultValue={contactNo}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridDate">
                    <Form.Label>Interview Date</Form.Label>
                    <Form.Control
                      onChange={(e) => setDates(e.target.value)}
                      required
                      defaultValue={dates}
                      type="date"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                {/* <Col>
                  <Form.Group controlId="formGridStatus">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      type="date"
                    />
                  </Form.Group>
                </Col> */}

                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      placeholder="Enter Experience"
                      type="experience"
                      value={experiences}
                      onChange={(e) => setExperiences(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={statuss}
                      onChange={(e) => setStatuss(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                        Select Status
                      </option>
                      <option value="Good">Good</option>
                      <option value="Normal">Normal</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Bad">Bad</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Programming Language</Form.Label>
                    <Form.Control
                      as="select"
                      value={languages}
                      defaultValue={language}
                      onChange={(e) => setprogLanguages(e.target.value)}
                      required
                    >
                      <option value="">select</option>
                      <option value="Dot.NET">Dot.NET</option>
                      <option value="LARAVE">LARAVEL</option>
                      <option value="REACT">REACT</option>
                      <option value="FLUTTER">FLUTTER</option>
                      <option value="FULL STACK">FULL STACK</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Rating</Form.Label>
                  {}
                  <ReactStars
                    count={5}
                    size={24}
                    isEdit={true}
                    activeColors={[
                      "red",
                      "orange",
                      "#FFCE00",
                      "#9177FF",
                      "#8568FC",
                    ]}
                    value={ratings}
                    onChange={ratingsChanged}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>Discipline</Form.Label>
                  {}
                  <ReactStars
                    count={5}
                    size={24}
                    isEdit={true}
                    activeColors={[
                      "red",
                      "orange",
                      "#FFCE00",
                      "#9177FF",
                      "#8568FC",
                    ]}
                    value={disciplines}
                    onChange={disciplinesChanged}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridStatus">
                  <Form.Label>ProfessionalAttitude</Form.Label>
                  {}
                  <ReactStars
                    count={5}
                    size={24}
                    isEdit={true}
                    activeColors={[
                      "red",
                      "orange",
                      "#FFCE00",
                      "#9177FF",
                      "#8568FC",
                    ]}
                    value={ProfessionalsAttitudes}
                    onChange={professionalsAttitudeChanged}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-3">
                <Col>
                  <div>
                    <h1 style={{ textAlign: "center" }}>Comments</h1>
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="write your content ...."
                        onChange={handleProcedureContentChanged}
                        style={{ height: "200px" }}
                        defaultValue={comments}
                      ></ReactQuill>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="pdfs-div">
                <Col>
                  <Form.Group as={Col} controlId="formGridImage">
                    <Form.Label className="form-label-addUser">
                      PDF File:
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfChange}
                    />
                    {fileSizeError && (
                      <div className="error-message">{fileSizeError}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="formGridStatus">
                    <Form.Label>Overall Rating</Form.Label>
                    {}
                    <ReactStars
                      count={5}
                      size={15}
                      isEdit={true}
                      activeColors={[
                        "#FFCE00",
                        "#FFCE00",
                        "#FFCE00",
                        "#FFCE00",
                        "#FFCE00",
                      ]}
                      value={allratings}
                      onChange={OverallratingsChanged}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="addBtn">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={deleteShow} onHide={() => setDeleteShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Check-Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(event) => handleDeleteData(event)}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="employeeList">
        <div className="row">
          <div className="col-6">
            <h2 className="headingListt">Interview Data</h2>
          </div>
          <div className="d-flex gap-2 col-2 justify-content-end">
            <Row>
              <Col sm={5}>
                <Form>
                  <Form.Group>
                    <Form.Control
                      className="fieldss"
                      type="text"
                      placeholder="Enter name to search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="d-flex gap-2 col-2 justify-content-end">
            <Button
              className="btn-search"
              variant="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="d-flex gap-2 col-2 justify-content-front">
            <Button
              variant="secondary"
              className=" custom btn-style"
              onClick={handleShow}
            >
              Add Applicant
            </Button>
          </div>
        </div>

        <GridTable
          data={data}
          columns={columns}
          minHeight={"300px"}
          minWidth={"300px"}
          sortable={true}
        />
      </div>
    </div>
  );
};

export default InterviewData;
