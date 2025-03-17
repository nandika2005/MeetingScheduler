import React, { useState } from "react";
import "./components/Settings.css";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [timezone, setTimezone] = useState("GMT");

  // Function to handle settings update
  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-section">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="settings-section">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="settings-section">
        <label>Enable Notifications:</label>
        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
      </div>

      <div className="settings-section">
        <label>Time Zone:</label>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="GMT">GMT</option>
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Standard Time (EST)</option>
          <option value="PST">Pacific Standard Time (PST)</option>
        </select>
      </div>

      <button className="save-button" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Settings;
