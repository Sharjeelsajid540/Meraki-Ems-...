import React from "react";
import { SideNavbar } from "./SideNavbar";
import { Profile } from "./Profile";
import "./css/ManageTickets.css";

const ManageTickets = () => {
  return (
    <>
      <SideNavbar />
      <Profile />
      <div className="ticketContainer">
        <h2 className="ticketHeading">Manage Tickets</h2>
      </div>
    </>
  );
};

export default ManageTickets;
