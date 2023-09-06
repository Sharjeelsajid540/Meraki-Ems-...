import React, { useState } from 'react';

function CheckOut({ checkInTime }) {
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleCheckOut = () => {
    const currentTime = new Date().toLocaleString();
    setCheckOutTime(currentTime);
    setButtonClicked(true);
  };
  

  return (
    <div>
      <h2>Check-Out</h2>
      <button className={`btn btn-1 ${buttonClicked ? 'btn-clicked' : ''}`} onClick={handleCheckOut}>
        Check-Out
      </button>
      
      <p>Check-Out Time: {checkOutTime || 'Not checked out yet'}</p>
    </div>
  );
}

export default CheckOut;
