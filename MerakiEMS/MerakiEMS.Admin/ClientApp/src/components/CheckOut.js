import React, { useState } from 'react';
import axios from 'axios';
import './CheckBtn.css';

function CheckOut({ vid, userID }) {
  const id = localStorage.getItem('loginData');
  var idData = JSON.parse(id);
  console.log(idData.id);

  const attendId = localStorage.getItem('AtendanceID');
var attendID = JSON.parse(attendId);
console.log(attendID.attendanceID);

  const [checkOutTime, setCheckOutTime] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  
  

  const handleCheckOut = async () => {
    const currentTime = new Date().toLocaleString();
    try {
      const response = await axios.put(
        'https://localhost:7206/api/User/UserCheckOut',
        {
          attendanceID: attendID.attendanceID,
          checkOutTime: new Date(),
          userID: idData.id,
        }
      );
      if (response.status === 200) {
        // Check-out successful, update the state or perform any necessary actions
        setCheckOutTime(response.data.checkOutTime);
        window.location.reload();
        

      } else {
        console.error('Error checking out:', response.data);
      }
    } catch (error) {
      console.error('Error checking out:', error);
    }

    setCheckOutTime(currentTime);
  setButtonClicked(true);
  };
  
  return (
    <div>
      <h2>Check-Out</h2>
      <button
        className={`btn btn-1 ${buttonClicked ? 'btn-clicked' : ''}`}
        onClick={handleCheckOut}
      >
        Check-Out
      </button>
      <p>Check-Out Time: {checkOutTime || 'Not checked Out yet'}</p>
    </div>
  );
}

export default CheckOut;
