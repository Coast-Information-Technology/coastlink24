import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50">
      <div className="spin"></div>
    </div>
  );
};

export default LoadingSpinner;
