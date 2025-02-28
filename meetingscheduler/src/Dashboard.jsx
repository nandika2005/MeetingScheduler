import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./components/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({ title: "", date: "", time: "" });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
      fetchMeetings(loggedInUser.id);
    }
  }, [navigate]);

  const fetchMeetings = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/meetings/${userId}`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
  };

  const addMeeting = async () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/meetings", {
        userId: user.id,
        ...newMeeting,
      });
      setMeetings([...meetings, response.data]);
      setNewMeeting({ title: "", date: "", time: "" });
    } catch (error) {
      console.error("Error adding meeting:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      <button className="logout-btn" onClick={() => { localStorage.removeItem("user"); navigate("/login"); }}>
        Logout
      </button>

      <h2>Your Meetings</h2>
      <div className="meetings-list">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div key={meeting._id} className="meeting-item">
              <h3>{meeting.title}</h3>
              <p>Date: {meeting.date}</p>
              <p>Time: {meeting.time}</p>
            </div>
          ))
        ) : (
          <p>No meetings scheduled.</p>
        )}
      </div>

      <h2>Add New Meeting</h2>
      <div className="add-meeting-form">
        <input type="text" name="title" placeholder="Meeting Title" value={newMeeting.title} onChange={handleInputChange} />
        <input type="date" name="date" value={newMeeting.date} onChange={handleInputChange} />
        <input type="time" name="time" value={newMeeting.time} onChange={handleInputChange} />
        <button className="add-meeting-btn" onClick={addMeeting}>Add Meeting</button>
      </div>
    </div>
  );
};

export default Dashboard;
