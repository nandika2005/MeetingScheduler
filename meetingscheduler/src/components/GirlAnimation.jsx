import React from "react";
import Lottie from "lottie-react";
import animationData from "./Animation - 1740633500371.json";

const GirlAnimation = () => {
  return <Lottie animationData={animationData} loop={true} style={{ width: 200, height: 400,marginRight:20,marginBottom:300}} />;
};

export default GirlAnimation;
