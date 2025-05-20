import React from "react";
import "../style/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the OS Algorithm Visualizer</h2>
      <p>
        Understand complex OS algorithms with interactive and dynamic
        visualizations.
      </p>
      <Link to="/select" className="start-btn">
        <i className="fas fa-play"></i> Get Started
      </Link>
    </div>
  );
};

export default HomePage;
