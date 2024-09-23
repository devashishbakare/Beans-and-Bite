import React from "react";
import { ClipLoader } from "react-spinners";
function CircularSpinner() {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <div style={spinnerStyle}>
      <ClipLoader color="#003b95" size={25} />
    </div>
  );
}

export default CircularSpinner;
