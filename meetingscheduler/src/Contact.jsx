import React, { useState } from "react";
import "./components/Contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have any questions or need support? We're here to help!</p>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows="4"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <h2>Other Ways to Reach Me</h2>
      <p> Email: nandikamaheshwar6@gmail.com</p>
      <p> Phone: +91 8778511554</p>
    </div>
  );
};

export default Contact;
