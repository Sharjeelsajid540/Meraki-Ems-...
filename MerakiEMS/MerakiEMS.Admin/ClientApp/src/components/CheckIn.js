import React, { useState } from 'react';
import './CheckBtn.css';
import axios from 'axios'; // Import Axios
function CheckIn({ fetchAttendanceData }) {
  const id = localStorage.getItem('loginData');
  var idData = JSON.parse(id);
  console.log(idData.id);
  const [checkInTime, setCheckInTime] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [checkInData, setCheckInData] = useState({
    checkInTime: new Date(),
    userID: idData.id// Replace with the actual user ID
  });
  console.log(new Date());
  const handleCheckIn = () => {
    const currentTime = new Date().toLocaleString();
    axios.post('https://localhost:7206/api/User/UserCheckIn', checkInData)
      .then(response => {
        if (response.status === 200) {
          // Handle success, and access the returned data
          localStorage.setItem('AtendanceID', JSON.stringify(response.data));
          window.location.reload();
         
          // Success, handle accordingly

        } else {
          // Handle errors
        }
      })
      .catch(error => {
        // Handle network errors or other errors
      });

    setCheckInTime(currentTime);
    setButtonClicked(true);
  };


  return (
    <div>
      <h2>Check-In</h2>
      <button className={`btn btn-1 ${buttonClicked ? 'btn-clicked' : ''}`} onClick={handleCheckIn}>
        Check-In
      </button>
      <p>Check-In Time: {checkInTime || 'Not checked In yet'}</p>

    </div>
  );
}

export default CheckIn;
