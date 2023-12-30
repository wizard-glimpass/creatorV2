import React from "react";
import "./homepage.scss";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="company-title-text">
        <h3>Welcome to GLIMPASS</h3>
      </div>
      <div className="route-btn-container">
        <Link to="/add-node">
          <button className="button button--primary">Add Nodes</button>
        </Link>
        <Link to="/create-trip">
          <button className="button button--secondary">Create trip</button>
        </Link>
      </div>
      <Link to="/validate-angles">
        <button className="button button--primary validate-angle">
          Validate Angle's
        </button>
      </Link>
      <Link to="/validate-trip">
        <button className="button button--primary validate-angle">
          Validate Trip
        </button>
      </Link>
    </div>
  );
};

export default Homepage;
