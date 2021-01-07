import React from "react";

export const Radius = (props) => {
  const { radii } = props;
  //adjusted means the middle of the circle will be at
  const adjustedX = props.coordinates.x - radii;
  const adjustedY = props.coordinates.y - radii;

  return (
    <div
      className="radius fade_out"
      style={{
        left: adjustedX,
        top: adjustedY,
        height: radii * 2 + "px",
        width: radii * 2 + "px",
      }}
    ></div>
  );
};

export default Radius;
