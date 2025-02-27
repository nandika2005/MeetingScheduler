import React from "react";
import Lottie from "lottie-react";
import animationData from "./business-group-meeting.json"

const MeetingAnimation = () => {
  return <Lottie animationData={animationData} loop={true} style={{ width: 400, height: 400,marginLeft:20,marginBottom:100}} />;
};

export default MeetingAnimation;
