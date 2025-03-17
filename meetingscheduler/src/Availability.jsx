import React, { useState } from "react";
import "./components/Availability.css";

const Availability = () => {
  const [availability, setAvailability] = useState([]);

  const addAvailability = () => {
    // Dummy function for testing
    setAvailability([...availability, { day: "Monday", time: "10:00 AM - 12:00 PM" }]);
  };

  return (
    <div className="availability-container">
      <h2>Set Your Availability</h2>
      <form className="availability-form">
        <label>Day:</label>
        <select>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
        </select>

        <label>Time Slot:</label>
        <input type="text" placeholder="e.g., 10:00 AM - 12:00 PM" />

        <button type="button" onClick={addAvailability}>Add</button>
      </form>

      <ul>
        {availability.map((slot, index) => (
          <li key={index}>
            {slot.day}: {slot.time}
            <button>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Availability;
