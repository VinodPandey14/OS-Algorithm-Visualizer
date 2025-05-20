import React from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <i className="fas fa-cogs fa-spin"></i>
        <h1>OS Visualizer</h1>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/select">Select Algorithm</Link>
      </div>
    </nav>
  );
};

export default Navbar;
