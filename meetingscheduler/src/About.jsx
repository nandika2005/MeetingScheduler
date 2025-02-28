import React from "react";
import "./components/About.css"
import WhyChooseMeetUp from "./WhyChooseMeetUp"; 

const About = () => {
  return (
    <div className="about-container">
      <h1>About MeetUp</h1>
      <br />
      <div className="p1">
        <p>
          Whether you're organizing a team meeting, a client call, or a personal appointment, MeetUp makes it easy to 
          create, join, and manage meetings effortlessly.
        </p>
      </div>
      <WhyChooseMeetUp />
      <br />
      <p>Join MeetUp today and experience the future of hassle-free scheduling! 🚀</p>
    </div>
  );
};

export default About;
