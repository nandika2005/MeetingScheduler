import React, { useState } from "react";
import "./components/Availability.css";

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("monday");
  const [timeSlot, setTimeSlot] = useState("");

  const addAvailability = () => {
    if (!timeSlot.trim()) {
      alert("Please enter a valid time slot.");
      return;
    }

    setAvailability([...availability, { day: selectedDay, time: timeSlot }]);
    setTimeSlot(""); // Clear input after adding
  };

  const deleteAvailability = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  return (
    <div className="availability-container">
      <h2>Set Your Availability</h2>
      <form className="availability-form">
        <label>Day:</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>

        <label>Time Slot:</label>
        <input 
          type="text" 
          placeholder="e.g., 10:00 AM - 12:00 PM" 
          value={timeSlot} 
          onChange={(e) => setTimeSlot(e.target.value)} 
        />

        <button type="button" onClick={addAvailability}>Add</button>
      </form>

      <ul>
        {availability.map((slot, index) => (
          <li key={index}>
            {slot.day}: {slot.time}
            <button onClick={() => deleteAvailability(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Availability;
