import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useForm, Controller } from "react-hook-form";
import "react-responsive-modal/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from "react-stars";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function ({
  open,
  onClose,
  onConfirm,
  modalHeader,
  modalFooter,
  updateData,
}) {
  const [fileSizeError, setFileSizeError] = useState("");
  const [comments, setComments] = useState("");
  const [fileBase64, setFileBase64] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm();
  useEffect(() => {
    if (updateData) {
      setValue("employeeName", updateData.employeeName || "");
      setValue("email", updateData.email || "");
      setValue("date", updateData.date || "");
      setValue("contactNo", updateData.contactNo || "");
      setValue("experience", updateData.experience || "");
      setValue("status", updateData.status || "");
      setValue("programmingLanguage", updateData.programmingLanguage || "");
      setValue("rating", updateData.rating || "");
      setValue("discipline", updateData.discipline || "");
      setValue("professionalAttitude", updateData.professionalAttitude || "");
      setValue("comments", updateData.comments || "");
      setValue("overallRating", updateData.overallRating || "");
    }
    if (modalFooter === "Submit") {
      reset();
    }
  }, [updateData, setValue, modalFooter]);
  const onSubmit = (data) => {
    data.file = fileBase64;
    onConfirm(data);
    reset();
    onClose();
  };

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

  const maxFileSize = 500 * 1024;

  const handlefileChange = (e) => {
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
        const base64file = reader.result.split(",")[1];
        setFileBase64(base64file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleModalCloses = () => {
    if (modalFooter == "Submit") {
      reset();
    }
    onClose();
  };

  // useEffect(() => {
  //   if (modalFooter === "Submit") {
  //     reset();
  //   }
  // }, [modalFooter]);

  return (
    <Modal open={open} onClose={handleModalCloses} center>
      <form onSubmit={handleSubmit(onSubmit)} className="px-6 rounded-md">
        <div className="main-div custom-interview-modal">
          <div className="w-1/2">
            <h4 className="">{modalHeader}</h4>
          </div>
          <div className="">
            <div className="grid gap-4 grid-cols-4">
              <div className="">
                <label htmlFor="employeeName" className="block mb-2">
                  Applicant Name
                </label>
                <input
                  id="employeeName"
                  {...register("employeeName", {
                    required: "Employee Name Required",
                  })}
                  type="text"
                  placeholder="Enter Name"
                  className={`rounded py-2 px-5 border border-solid border-black w-full ${
                    errors.employeeName ? "border-red-500" : ""
                  }`}
                />
                {errors.employeeName && (
                  <p className="text-red-500">{errors.employeeName.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email Required",
                  })}
                  className={`rounded py-2 px-5 border border-solid border-black w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  placeholder=" example@gamil.com"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="date" className="block mb-2">
                  Interview Date
                </label>
                <input
                  id="date"
                  {...register("date", {
                    required: "Interview Date Required",
                  })}
                  type="date"
                  className={`rounded py-2 px-5  border border-solid border-black w-full ${errors.date}`}
                />
                {errors.date && (
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="contactNo" className="block mb-2">
                  Contact #
                </label>
                <input
                  id="contactNo"
                  {...register("contactNo", {
                    required: "Contact Number Required",
                  })}
                  className={`rounded py-2 px-5 border border-solid border-black w-full ${
                    errors.contactNo ? "border-red-500" : ""
                  }`}
                  placeholder="Enter contactNo"
                  type="contact"
                />
                {errors.contactNo && (
                  <p className="text-red-500">{errors.contactNo.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-x-8 gap-y-4 grid-cols-3 mt-5">
              <div className="">
                <label htmlFor="experience" className="block mb-2">
                  Experience
                </label>
                <input
                  id="experience"
                  placeholder="Enter experience"
                  {...register("experience", {
                    required: "Experience Required",
                  })}
                  type="experience"
                  className={`rounded py-2 px-5 border  border-solid border-black w-full ${
                    errors.experience ? "border-red-500" : ""
                  }`}
                />
                {errors.experience && (
                  <p className="text-red-500">{errors.experience.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="status" className="block mb-2">
                  Status
                </label>
                <select
                  id="status"
                  {...register("status", {
                    required: "Status Required",
                  })}
                  className={`rounded py-2 px-5 border  border-solid border-black w-full ${
                    errors.status ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Select Status
                  </option>
                  <option value="Select">Select</option>
                  <option value="Good">Good</option>
                  <option value="Normal">Normal</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Bad">Bad</option>
                </select>
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="programmingLanguage" className="block mb-2">
                  Programming Language
                </label>
                <select
                  id="programmingLanguage"
                  {...register("programmingLanguage", {
                    required: "Language Required",
                  })}
                  className={`rounded py-2 px-5 border border-solid border-black w-full ${
                    errors.programmingLanguage ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option value="Select">Select</option>
                  <option value="Dot.NET">Dot.NET</option>
                  <option value="LARAVEL">LARAVEL</option>
                  <option value="REACT">REACT</option>
                  <option value="FLUTTER">FLUTTER</option>
                  <option value="FULL STACK">FULL STACK</option>
                </select>
                {errors.programmingLanguage && (
                  <p className="text-red-500">
                    {errors.programmingLanguage.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-x-8 gap-y-4 grid-cols-4 mt-5">
              <div className="">
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "Rating Required" }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <label htmlFor="rating" className="block mb-2 w-full">
                        Rating
                      </label>
                      <ReactStars
                        id="rating"
                        count={5}
                        size={25}
                        isEdit={true}
                        activeColors={[
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                        ]}
                        value={value}
                        onChange={(newValue) => {
                          onChange(String(newValue));
                        }}
                      />
                    </div>
                  )}
                />
                {errors.rating && (
                  <p className="text-red-500">{errors.rating.message}</p>
                )}
              </div>
              <div className="">
                <Controller
                  name="discipline"
                  control={control}
                  rules={{ required: "Discipline Required" }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <label htmlFor="discipline" className="block mb-2 w-full">
                        Discipline
                      </label>
                      <ReactStars
                        id="discipline"
                        count={5}
                        size={25}
                        isEdit={true}
                        activeColors={[
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                        ]}
                        value={value}
                        onChange={(newValue) => {
                          onChange(String(newValue));
                        }}
                      />
                    </div>
                  )}
                />
                {errors.discipline && (
                  <p className="text-red-500">{errors.discipline.message}</p>
                )}
              </div>
              <div className="">
                <Controller
                  name="professionalAttitude"
                  control={control}
                  rules={{ required: "Professional Attitude Required" }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <label
                        htmlFor="professionalAttitude"
                        className="block mb-2 w-full"
                      >
                        Professional Attitude
                      </label>
                      <ReactStars
                        id="professionalAttitude"
                        count={5}
                        size={25}
                        isEdit={true}
                        activeColors={[
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                        ]}
                        value={value}
                        onChange={(newValue) => {
                          onChange(String(newValue));
                        }}
                      />
                    </div>
                  )}
                />
                {errors.professionalAttitude && (
                  <p className="text-red-500">
                    {errors.professionalAttitude.message}
                  </p>
                )}
              </div>
              <div className="">
                <Controller
                  name="overallRating"
                  control={control}
                  rules={{ required: "Overall Rating Required" }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <label
                        htmlFor="overallRating"
                        className="block mb-2 w-full"
                      >
                        Overall rating
                      </label>
                      <ReactStars
                        id="overallRating"
                        count={5}
                        size={25}
                        isEdit={true}
                        activeColors={[
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                        ]}
                        value={value}
                        onChange={(newValue) => {
                          onChange(String(newValue));
                        }}
                      />
                    </div>
                  )}
                />
                {errors.overallRating && (
                  <p className="text-red-500">{errors.overallRating.message}</p>
                )}
              </div>
            </div>
            <div className="">
              <Controller
                name="comments"
                control={control}
                defaultValue={comments}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <h1 htmlFor="comments">Comments:</h1>
                    <ReactQuill
                      id="comments"
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      placeholder="Add comments here ..."
                      onChange={onChange}
                      value={value}
                      style={{ height: "200px" }}
                    />
                  </div>
                )}
              />
            </div>
            <div className=" flex mt-[40px] grid gap-4 grid-cols-2">
              <div className="mb-5">
                <label htmlFor="file" className="mt-5">
                  File:
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handlefileChange}
                  className="border border-solid border-black mr-20 w-full"
                />
                {fileSizeError && (
                  <div className="error-message">{fileSizeError}</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="py-4 px-[35rem] bg-custom-blue text-white font-bold rounded hover:bg-custom-hover rounded-2xl "
            >
              {modalFooter}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
