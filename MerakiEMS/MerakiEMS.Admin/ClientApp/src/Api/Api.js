import axios from "axios";
import React, { useState, useEffect } from "react";
const apiUrl = "https://localhost:7206/";

/////////   Attendance List    ///////

export const fetchAttendanceData = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/UserAttendance", data);
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

export const fetchAllAttendanceData = async () => {
  try {
    const response = await axios.get(apiUrl + "api/User/AllUserAttendance");
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

/////////   CheckIn    ///////

export const CheckInUser = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/UserCheckIn", data);

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
export const CheckOutUser = async (data) => {
  try {
    const response = await axios.put(apiUrl + "api/User/UserCheckOut", data);
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

/////////   CheckOutStatus    ///////

export const CheckOutStatus = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/CheckCheckOut", data);

    if (response.status === 200) {
      if (response.status == "true") {
      }

      // localStorage.setItem("AttendanceID", JSON.stringify(response.data));

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

/////////   CheckInStatus    ///////

export const CheckInStatus = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/CheckCheckIn", data);

    if (response.status === 200) {
      if (response.data.isRequestSuccessfull == "true") {
      }

      // localStorage.setItem("AttendanceID", JSON.stringify(response.data));

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
    const response = await axios.post(apiUrl + "api/User/AddLeave", data);
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
    const response = await axios.post(apiUrl + "api/User/GetLeave", data);
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
    const response = await axios.post(apiUrl + "api/User/SendEmail", data);
    if (response.status === 200) {
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
      localStorage.setItem("usersList", JSON.stringify(response.data));

      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Fetch Single User Data   //////////

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

///////////   Update User   //////////

export const updateUsersData = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/UpdateUser", data);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};


///////////   Delete User   //////////

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      apiUrl + `api/User/DeleteUser?id=${id}`
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

///////////   Add Ticket   //////////

export const addTicket = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/AddTicket", data);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Get Tickets   //////////

export const getTicket = async (id) => {
  try {
    const response = await axios.post(apiUrl + `api/User/GetTickets?id=${id}`);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Get All Tickets   //////////

export const getAllTickets = async () => {
  try {
    const response = await axios.get(apiUrl + "api/User/GetAllTickets");
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Update Tickets   //////////

export const updateTickets = async (data) => {
  try {
    const response = await axios.put(apiUrl + "api/User/UpdateTicket", data);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

/////// Update Leaves Api //////

export const UpdateLeaveStatus = async (data) => {

  try {
    const response = await axios.put(
      apiUrl + "api/User/AdminRequest",
      data
    );

    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};



///////////   Get Roles   //////////

export const getManagers = async () => {
  try {
    const result = await axios.get(apiUrl + "api/User/ManagerList");
    return result.data;
  } catch (error) {
    throw error; // Propagate the error back to the caller for handling
  }
};

///////////   Get Roles   //////////

export const getRoles = async () => {
  try {
    const result = await axios.get(apiUrl + "api/User/UserRole");
    return result.data;
  } catch (error) {
    throw error; // Propagate the error back to the caller for handling
  }
};

///////////   Add User   //////////

export const addUser = async (data) => {
  try {
    const result = await axios.post(apiUrl + "api/User/AddUser", data);

    if (result.data.isRequestSuccessful === true) {
      return { success: true, message: "User has been Added" };
    } else {
      return { success: false, message: result.data.successResponse };
    }
  } catch (error) {
 
    throw error;
  }
};


///////////   Login   //////////

export const LoginUser = async (request) => {
  try {
    const result = await axios.post(apiUrl + "api/User/Login", request);
    console.log("login response",result.data);
    localStorage.setItem("loginData", JSON.stringify(result.data));
    if (result.data.isSuccess === true) {
      
      return { success: true, message: "Login Successful" };
    } else {
      return { success: false, message: "Invalid Name or Password" };
    }
  } catch (error) {
 
    throw error;
  }
};

///////////   Get Users   //////////

export const getUsers = async () => {
  try {
    const result = await axios.get(apiUrl + "api/User/UserList");
    
    return result.data;
  } catch (error) {
    throw error; 
  }
};

///////////   Add Perfromance   //////////

export const addPerform = async (data) => {
  try {
    const result = await axios.post(apiUrl + "api/User/AddPerform", data);
    return result.data;
  } catch (error) {
    throw error; 
  }
};



///////////   Fetch Performance   //////////

export const fetchPerformData = async (data) => {
  try {
    const result = await axios.get(apiUrl + "api/User/GetPerformance", data);
    return result.data;
  } catch (error) {
    throw error; 
  }
};


///////////   Fetch All Users Data   //////////

export const fetchAllLeaves = async () => {
  try {
    const response = await axios.get(apiUrl + "api/User/GetAllLeave");
    if (response.status == 200) {
      

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
    const response = await axios.put(
      apiUrl + "api/User/FinePaid",
      data
    );

    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
///////////   Fine Count   //////////

export const FineCount = async (id) => {
  try {
    const response = await axios.post(
      apiUrl + `api/User/FineCount?UserID=${id}`
    );
    if (response.status == 200) {
      console.log(response.data)
      return response.data;

    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};

///////////   Get Late Records   //////////

export const getLate = async (data) => {
  try {
   
    const response = await axios.post(apiUrl + "api/User/AllUserAttendance", data);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};


///////////   Get Late Records   //////////

export const getPendingLeaves = async (isLeaveFilter) => {
  try {
   
    const response = await axios.get(apiUrl + `api/User/GetAllLeave?isLeaveFilter=${isLeaveFilter}`);
    if (response.status == 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return error.response;
  }
};



export const GetOrders = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Order/GetOrders");

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const GetUsers = async (data) => {
  try {
    const resp = await axios.get(apiUrl + "api/Authetication/GetAllUsers");

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const OrderPlace = async (
  productId,
  userId,
  address,
  productName,
  customerName,
  email
) => {
  try {
    const resp = await axios.post(apiUrl + "api/Order/PlaceOrders", {
      productId: productId,
      userId: userId,
      address: address,
      productName: productName,
      customerName: customerName,
      customerEmail: email,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return err.response;
  }
};
export const CheckMyOrders = async (id) => {
  try {
    const resp = await axios.get(apiUrl + "api/Order/MyOrders", {
      params: {
        id: id,
      },
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const UpdateStatus = async (id, status) => {
  try {
    const resp = await axios.put(apiUrl + "api/Order/ChangeStatus", {
      id: id,
      status: status,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const RegisterUser = async (
  firstName,
  lastName,
  email,
  password,
  gender
) => {
  try {
    const resp = await axios.post(apiUrl + "api/Authetication/Register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const UpdateProducts = async (
  Id,
  ProductName,
  price,
  quantity,
  description,
  image
) => {
  const formData = new FormData();
  formData.append("Id", Id);
  formData.append("image", image);
  formData.append("ProductName", ProductName);
  formData.append("Price", price);
  formData.append("Quantity", quantity);
  formData.append("Description", description);

  await axios({
    method: "put",
    url: apiUrl + "api/Product/UpdateProduct",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    return response;
  });
};

export const UploadProducts = async (
  ProductName,
  price,
  quantity,
  description,
  image
) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("ProductName", ProductName);
  formData.append("Price", price);
  formData.append("Quantity", quantity);
  formData.append("Description", description);

  await axios({
    method: "post",
    url: apiUrl + "api/Product/AddProduct",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    return response;
  });
};
export const CreateUser = async (
  firstName,
  lastName,
  email,
  password,
  gender,
  role
) => {
  try {
    const resp = await axios.post(apiUrl + "api/Authetication/AddAdmin", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
      role: role,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const ChangeUser = async (
  id,
  firstName,
  lastName,
  email,
  password,
  gender,
  role
) => {
  try {
    const resp = await axios.put(apiUrl + "api/Authetication/UpdateUser", {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
      role: role,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};

export const ChangeOrder = async (id, customerName, customerEmail, address) => {
  try {
    const resp = await axios.put(apiUrl + "api/Order/UpdateOrder", {
      id: id,
      address: address,
      customerName: customerName,
      customerEmail: customerEmail,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const RemoveUser = async (id) => {
  try {
    const resp = await axios.put(apiUrl + "api/Authetication/RemoveUser", {
      id: id,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
export const RemoveProduct = async (id) => {
  try {
    const resp = await axios.put(apiUrl + "api/Product/RemoveProduct", {
      id: id,
    });

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
  }
};
