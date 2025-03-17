import InfiniteScroll from './components/InfiniteScroll.jsx';
import React from "react";
import "./components/WhyChooseMeetUp.css"; 

const items = [
  { content: "📅 Effortless Scheduling  Plan meetings with just a few clicks." },
  { content: "🔐 Secure Authentication Stay protected with JWT-based authentication." },
  { content: "📩 Email Notifications Get real-time updates and confirmations." },
  { content: "📊 Personal Dashboard Track and manage your scheduled meetings." },
  { content: "🌍 Hosted for Accessibility Available anywhere, anytime." }
];

const WhyChooseMeetUp = () => {
  return (
    <div className="side-box">
      <h2 className="side-box-title">Why Choose MeetUp?</h2>
      <div className="scroll-container">
        <InfiniteScroll
          items={items}
          isTilted={false}
          autoplay={true}
          autoplaySpeed={0.8} 
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
};

export default WhyChooseMeetUp;

