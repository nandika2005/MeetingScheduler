import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components/CreateMeeting.css";
const CreateMeeting = () => {
    const [meetingName, setMeetingName] = useState("");
    const [duration, setDuration] = useState("");
    const [meetingType, setMeetingType] = useState("zoom");
    const [meetingURL, setMeetingURL] = useState("");
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        fetchMeetings();
    }, []);

    const generateMeetingURL = async () => {
      const baseURL = meetingType === "zoom" ? "https://zoom.us/j/" : "https://meet.google.com/";
      const randomID = Math.floor(Math.random() * 1000000);
      const generatedURL = `${baseURL}${randomID}`;
      setMeetingURL(generatedURL);
  
      try {
          const token = localStorage.getItem("token"); // Retrieve the token from localStorage
          const response = await axios.post(
              "https://meetingscheduler-0r5o.onrender.com/meetings",
              { meetingName, duration, meetingType, meetingURL: generatedURL },
              {
                  headers: { Authorization: token }, // Send token in the request header
              }
          );
  
          console.log("Meeting created:", response.data);
          fetchMeetings();
      } catch (error) {
          console.error("Error creating meeting:", error.response?.data || error.message);
      }
  };
  
  const fetchMeetings = async () => {
      try {
          const token = localStorage.getItem("token");
          const response = await axios.get("https://meetingscheduler-0r5o.onrender.com/api/meetings", {
              headers: { Authorization: token }, // Include token in request
          });
          setMeetings(response.data);
      } catch (error) {
          console.error("Error fetching meetings:", error.response?.data || error.message);
      }
  };
  

  const deleteMeeting = async (meetingId) => {
    try {
      let token = localStorage.getItem("token");
  
      console.log("Token before sending:", token); // Debugging
  
      if (!token) {
        console.error("No token found. Please log in again.");
        return;
      }
  
      // Ensure only one "Bearer" prefix
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // Remove duplicate "Bearer "
      }
  
      const response = await axios.delete(`https://meetingscheduler-0r5o.onrender.com/api/meetings/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Meeting deleted successfully", response.data);
  
      // Update UI immediately after deletion
      setMeetings((prevMeetings) => prevMeetings.filter(meeting => meeting._id !== meetingId));
  
    } catch (error) {
      console.error("Error deleting meeting:", error.response?.data || error);
    }
  };
  
  
  
  

    return (
        <div className="create-meeting-container">
            <h2>Create Meeting</h2>
            <form className="meeting-form">
                <label>Meeting Name:</label>
                <input type="text" placeholder="Meeting Name" onChange={(e) => setMeetingName(e.target.value)} />

                <label>Duration:</label>
                <input type="number" placeholder="Duration (min)" onChange={(e) => setDuration(e.target.value)} />

                <label>Meeting Type:</label>
                <select onChange={(e) => setMeetingType(e.target.value)}>
                    <option value="zoom">Zoom</option>
                    <option value="google">Google Meet</option>
                </select>

                <button type="button" onClick={generateMeetingURL}>Generate Meeting</button>
            </form>

            {meetingURL && (
                <p className="meeting-url">
                    Meeting Link: <a href={meetingURL} target="_blank" rel="noopener noreferrer">{meetingURL}</a>
                </p>
            )}

            <h3>Scheduled Meetings</h3>
            <ul>
                {meetings.map((meeting) => (
                    <li key={meeting._id}>
                        {meeting.meetingName} - <a href={meeting.meetingURL} target="_blank" rel="noopener noreferrer">{meeting.meetingURL}</a>
                        <button onClick={() => deleteMeeting(meeting._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateMeeting;
