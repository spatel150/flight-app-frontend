import React from "react";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-heading">Customers</div>
        <div className="nav-heading">Bookings</div>
        <div className="nav-heading">Flights</div>
      </div>
    </nav>
  );
};

export default Navbar;
