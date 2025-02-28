import React from "react";
import Lottie from "lottie-react";
import animationData from "./business-group-meeting.json"

const MeetingAnimation = () => {
  return <Lottie animationData={animationData} loop={true} style={{ width: 300, height:300}} />;
};

export default MeetingAnimation;