import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-responsive-modal/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getManagers, getRoles, addUser } from "../../../Apis/apis";

export default function ({ open, onClose, onConfirm }) {
  const [roleNames, setRoleNames] = useState([]);
  const [managerNames, setManagerNames] = useState([]);
  const [managerID, setManagerID] = useState("");
  const [isChanged, setIsChanged] = useState(0);
  const [fileSizeError, setFileSizeError] = useState("");
  const [image, setImage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log("ggggg", data);
    // onConfirm(data);
    if (!validateEmail(data.email)) {
      return;
    }

    if (!validatePassword(data.password)) {
      return;
    }

    if (!validateCNIC(data.cnic)) {
      return;
    }

    if (
      !validateContactNo(data.contactno) ||
      !validateContactNo(data.econtactno)
    ) {
      return;
    }
    data.image = image;
    console.log(data);
    try {
      const result = await addUser(data);

      if (result.success) {
        onClose();
        clear();
        toast.success(result.message);
        setShow(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
    onClose;
  };

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Invalid email address";
    }
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least 8 characters with a mix of lowercase, uppercase letters, and a special character";
    }
    return true;
  };

  const validateCNIC = (cnic) => {
    if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
      return "Invalid CNIC format. It should be 12345-1234567-1";
    }
    return true;
  };

  const validateContactNo = (contactNo) => {
    const regex = /^\d{4}-\d{7}$/;
    if (!regex.test(contactNo)) {
      return "Invalid contact no format. Use xxxx-xxxxxxx";
    }
    return true;
  };

  const clear = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    setValue("cnic", "");
    setValue("contactno", "");
    setValue("econtactno", "");
    setValue("address", "");
    setValue("roleID", "");
    setValue("managerID", "");
    setValue("image", "");
    setImage("");
  };

  useEffect(() => {
    fetchManagersData();
    fetchRolesData();
  }, []);

  const fetchRolesData = async () => {
    try {
      const rolesData = await getRoles();
      setRoleNames(rolesData);
      setIsChanged(isChanged + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   const managersData = getManagers();
  //   console.log("api response ", managersData)
  //   // fetchRolesData();
  // }, []);
  const fetchManagersData = async () => {
    try {
      const managersData = await getManagers();
      setManagerNames(managersData);
      setIsChanged(isChanged + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getManagerNamesFromLocalStorage = () => {
    const managerNames = localStorage.getItem("ManagersData");
    return managerNames ? JSON.parse(managerNames) : [];
  };

  const getRoleNamesFromLocalStorage = () => {
    const roleNames = localStorage.getItem("RolesData");
    return roleNames ? JSON.parse(roleNames) : [];
  };

  const maxFileSize = 3 * 1024 * 1024; // 3MB in bytes
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxFileSize) {
        setFileSizeError(" Maximum allowed size (3MB).");
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const storedRoleNames = getRoleNamesFromLocalStorage();
    setRoleNames(storedRoleNames);

    const storedManagerNames = getManagerNamesFromLocalStorage();
    setManagerNames(storedManagerNames);
    setShow(true);
  };

  return (
    <Modal open={open} onClose={onClose} center show={show}>
      <h2 className="text-3xl mb-1 ">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-interview-modal">
          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("email", {
                required: "Email is required",
                validate: validateEmail,
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "password" : ""}
                placeholder="Enter password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                id="passwordInput"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  id="eyeIcon"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  )}
                </svg>
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-2xl font-medium text-gray-700">
              CNIC
            </label>
            <input
              type="text"
              placeholder="Enter CNIC"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("cnic", {
                required: "CNIC is required",
                validate: validateCNIC,
              })}
            />

            {errors.cnic && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.cnic.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Contact No
            </label>
            <input
              type="text"
              placeholder="Enter Contact No"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("contactno", {
                required: "Contact No is required",
                validate: validateContactNo,
              })}
            />
            {errors.contactno && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.contactno.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Emergency Contact No
            </label>
            <input
              type="text"
              placeholder="Enter E-Contact No"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("econtactno", {
                required: "Emergency Contact No is required",
                validate: validateContactNo,
              })}
            />
            {errors.econtactno && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.econtactno.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-2xl font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter Address"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500 text-2xl mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Role
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("roleID", { required: "Role is required" })}
            >
              {roleNames.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
            {errors.roleID && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.roleID.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-2xl font-medium text-gray-700">
              Manager
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              {...register("managerID", { required: true })}
              value={managerID}
              onChange={(e) => setManagerID(e.target.value)}
              id="formGridState2"
            >
              <option value="" disabled>
                Select Manager
              </option>
              {managerNames.map((manager) => (
                <option key={manager.managerID} value={manager.managerID}>
                  {manager.managerName}
                </option>
              ))}
            </select>

            {errors.managerID && (
              <p className="text-red-500 text-2xl mt-1">
                {errors.managerID.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-16">
          <label className="block text-2xl font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            className="mt-1 block w-full text-2xl text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
            accept="image/*"
            onChange={handleImageChange}
          />
          {fileSizeError && (
            <p className="text-red-500 text-xs mt-1">{fileSizeError}</p>
          )}
        </div>

        <div className="mt-16">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-3xl font-medium text-white bg-custom-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
