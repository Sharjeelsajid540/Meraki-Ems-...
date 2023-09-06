import React, { useState } from 'react';
import './CheckBtn.css';
function CheckIn() {
  const [checkInTime, setCheckInTime] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleCheckIn = () => {
    const currentTime = new Date().toLocaleString();
    setCheckInTime(currentTime);
    setButtonClicked(true);
  };


  return (
    <div>
      <h2>Check-In</h2>
      <button className={`btn btn-1 ${buttonClicked ? 'btn-clicked' : ''}`} onClick={handleCheckIn}>
        Check-In
      </button>
      <p>Check-In Time: {checkInTime || 'Not checked in yet'}</p>
    </div>
  );
}

export default CheckIn;
