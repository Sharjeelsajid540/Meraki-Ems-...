import axios from "axios";
//const apiUrl = "https://localhost:7206/";
 const apiUrl = "http://www.meraki-ams.local/";

///////////   Login   //////////

export const loginUser = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/Login", data);

    if (response.status === 200) {
      if (response.data.isSuccess == true) {
        localStorage.setItem("LoginData", JSON.stringify(response.data));
      }

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

/////////   CheckIn    ///////

export const checkInUser = async (data) => {
  try {
    const response = await axios.post(
      apiUrl + "api/Attendance/UserCheckIn",
      data
    );

    if (response.status === 200) {
      if (response.data.isRequestSuccessfull == "true") {
        localStorage.setItem("AttendanceID", JSON.stringify(response.data));
      }

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

////////   CheckOut    ///////
export const checkOutUser = async (data) => {
  try {
    const response = await axios.post(
      apiUrl + "api/Attendance/UserCheckOut",
      data
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

/////////   Attendance List    ///////

export const fetchAttendanceData = async (data) => {
  try {
    const response = await axios.post(
      apiUrl + "api/Attendance/UserAttendance",
      data
    );
    if (response.status == 200) {
      localStorage.setItem("attendList", JSON.stringify(response.data));

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Fine Count   //////////

export const fineCount = async (id) => {
  try {
    const response = await axios.post(
      apiUrl + `api/User/FineCount?UserID=${id}`
    );
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Add Leave    //////////

export const addLeave = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/Leaves/AddLeave", data);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Fetch Leave    //////////

export const fetchLeave = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/Leaves/GetLeave", data);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};
///////////   Send Leave Email    //////////

export const sendEmail = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/Leaves/SendEmail", data);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Add User   //////////

export const addUser = async (data) => {
  try {
    const result = await axios.post(apiUrl + "api/Admin/AddUser", data);

    if (result.data.isRequestSuccessful === true) {
      return { success: true, message: "User has been Added" };
    } else {
      return { success: false, message: result.data.successResponse };
    }
  } catch (error) {
    throw error;
  }
};

///////////   Get Late Records   //////////

export const getLate = async (data) => {
  try {
    const response = await axios.post(
      apiUrl + "api/Attendance/AllUserAttendance",
      data
    );
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};
///////////   Fetch All Users Data   //////////

export const fetchAllUsersData = async () => {
  try {
    const response = await axios.get(apiUrl + "api/User/GetAllUsers");
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Get AllUsers  //////////

export const getAllUsers = async () => {
  try {
    const response = await axios.post(apiUrl + "api/Admin/Getuserid");
    if (response.status == 200) {
      localStorage.setItem("UserData", JSON.stringify(response.data));
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

////// Update Leaves Api //////

export const UpdateFineStatus = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/FinePaid", data);

    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

///////////   Get Managers   //////////

export const getManagers = async () => {
  try {
    const result = await axios.get(apiUrl + "api/Admin/ManagerList");
    return result.data;
  } catch (error) {
    throw error;
  }
};

///////////   Get Roles   //////////

export const getRoles = async () => {
  try {
    const result = await axios.get(apiUrl + "api/Admin/UserRole");
    return result.data;
  } catch (error) {
    throw error;
  }
};

///////////   Get Late Records   //////////

export const getPendingLeaves = async (isLeaveFilter, name, status) => {
  try {
    let apiUrlWithParams =
      apiUrl + `api/Leaves/GetAllLeave?isLeaveFilter=${isLeaveFilter}`;

    if (name !== null) {
      apiUrlWithParams += `&Name=${name}`;
    }

    if (status !== null) {
      apiUrlWithParams += `&Status=${status}`;
    }

    const response = await axios.get(apiUrlWithParams);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Get AllImage  //////////

export const fetchUserImage = async (id) => {
  try {
    const response = await axios.get(apiUrl + `api/User/GetUserImage?id=${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching User Image:", error);
    return false;
  }
};

export const fetchInterData = async (isDataFilter, Name) => {
  try {
    let apiUrlWithParams =
      apiUrl + `api/Admin/GetAllCandidateData?isDataFilter=${isDataFilter}`;

    if (Name !== null) {
      apiUrlWithParams += `&Name=${Name}`;
    }

    const response = await axios.get(apiUrlWithParams);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

export const updateCandidateData = async (data) => {
  try {
    const result = await axios.post(apiUrl + "api/Admin/UpdateCandidate", data);
    if (result.status == 200) {
      return result.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

export const deleteCandidateData = async (id) => {
  try {
    const result = await axios.post(
      `${apiUrl}api/Admin/Deleteapplicant?ID=${id}`
    );
    if (result.status === 200) {
      return result.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

export const showCvCandidate = async (id) => {
  try {
    const result = await axios.post(
      `${apiUrl}api/Admin/Getimageapplicant?id=${id}`
    );
    if (result.status === 200) {
      return result.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

export const fetchUserData = async (id) => {
  try {
    const response = await axios.post(apiUrl + `api/User/GetUser?id=${id}`);
    if (response.status == 200) {
      localStorage.setItem("userData", JSON.stringify(response.data));

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

export const updateLeaveStatus = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/Leaves/AdminRequest", data);

    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const addInterviewCandidate = async (data) => {
  try {
    const result = await axios.post(apiUrl + "api/Admin/Addapplicant", data);
    return result.data;
  } catch (error) {
    throw error;
  }
};
