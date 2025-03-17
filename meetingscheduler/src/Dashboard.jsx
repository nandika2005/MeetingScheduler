import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./components/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="Create">Create New Meeting</Link>
          </li>
          <li>
            <Link to="Avail"> Availability</Link>
          </li>
          <li>
            <Link to="Settings">⚙️Settings</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
