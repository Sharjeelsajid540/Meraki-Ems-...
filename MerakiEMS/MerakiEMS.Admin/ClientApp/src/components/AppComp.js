import React from 'react';

import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import AttendanceList from './AttendanceList';

function AppComp() {
  return (
    <div className="container">
 
      <div className="row">
        <div className="col-md-6">
          <CheckIn />
        </div>
        <div className="col-md-6">
          <CheckOut />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <AttendanceList />
        </div>
      </div>
    </div>
  );
}

export default AppComp;
