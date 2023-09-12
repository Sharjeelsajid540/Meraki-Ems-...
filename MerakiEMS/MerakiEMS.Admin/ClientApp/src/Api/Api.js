import axios from "axios";
const apiUrl = "https://localhost:7206/";



/////////   Attendance List    ///////


export const fetchAttendanceData = async (data) => {
  try {
    const response = await axios.post(apiUrl + "api/User/UserAttendance", data);
    if (response.status == 200) {
      console.log(response.data)
      
            
            localStorage.setItem('attendList', JSON.stringify(response.data));
            
            return response.data;
          } 
          else {
            return false;
          }
     } catch (error) {
    return error.response;
  } 
};



/////////   CheckIn    ///////


export const CheckInUser = async (data) => {
  try {
    const response = await axios.post(apiUrl + 'api/User/UserCheckIn', data);

    if (response.status === 200) {
      if(response.data.isRequestSuccessfull == "true"){
        localStorage.setItem('AttendanceID', JSON.stringify(response.data));
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
export const CheckOutUser = async (data) => {

try {
  const response = await axios.put(
    apiUrl + 'api/User/UserCheckOut',
    data
  );
  if (response.status === 200) {
    // Check-out successful, update the state or perform any necessary actions
    
   return response.data;
    

  } else {
    return false;
  }
} catch (error) {
  return error.response;
}
}
// export const userLogin = async (email, password) => {
//   try {
//     const resp = await axios.post(apiUrl + "api/Authetication/Login", {
//       email: email,
//       password: password,
//     });
//     if (resp.data.id > 0) {
//       localStorage.setItem("user", JSON.stringify(resp.data));
//     }
//     if (resp.status == 200) {
//       return resp.data;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     return err.response;
//   }
// };

export const GetProducts = async () => {
  try {
    const resp = await axios.get(apiUrl + "api/Product/GetProduct");

    if (resp.status == 200) {
      return resp.data;
    } else {
      return false;
    }
  } catch (err) {
    return err.response;
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
  })
  .then((response) => {
   
    return (response)

  }) 

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
  })
  .then((response) => {
   
    return (response)

  })

  };
  export const CreateUser = async (
    firstName,
    lastName,
    email,
    password,
    gender,role
  ) => {
    try {
      const resp = await axios.post(apiUrl + "api/Authetication/AddAdmin", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        role:role,
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
    role,

  ) => {
    try {
      const resp = await axios.put(apiUrl + "api/Authetication/UpdateUser", {
        id:id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        role:role,
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
  

  export const ChangeOrder = async (
    id,
    customerName,
    customerEmail,
    address,
  
   



  ) => {
    try {
      const resp = await axios.put(apiUrl + "api/Order/UpdateOrder", {
        id:id,
        address:address,
        customerName:customerName,
        customerEmail:customerEmail,
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
    
          id:id,
 
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
        
  
          id: id

        
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