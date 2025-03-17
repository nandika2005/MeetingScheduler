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
              "http://localhost:3002/api/meetings",
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
          const response = await axios.get("http://localhost:3002/api/meetings", {
              headers: { Authorization: token }, // Include token in request
          });
          setMeetings(response.data);
      } catch (error) {
          console.error("Error fetching meetings:", error.response?.data || error.message);
      }
  };
  

    const deleteMeeting = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/api/meetings/${id}`);
            fetchMeetings(); // Refresh meetings after deletion
        } catch (error) {
            console.error("Error deleting meeting:", error);
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
