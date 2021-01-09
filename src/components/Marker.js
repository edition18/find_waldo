import React from "react";

const Marker = (props) => {
  const { radii, xRatio, yRatio } = props;
  //adjusted means the middle of the circle will be at
  const adjustedX = xRatio * document.getElementById("waldo").width - radii;
  const adjustedY = yRatio * document.getElementById("waldo").height + radii;
  return (
    <div
      className="marker"
      style={{
        left: adjustedX,
        top: adjustedY,
        height: radii * 2 + "px",
        width: radii * 2 + "px",
      }}
    ></div>
  );
};

export default Marker;
