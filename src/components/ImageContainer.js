import React from "react";
import picture from "../assets/waldo.jpg";
import VisualCue from "./VisualCue.js";

const ImageContainer = (props) => {
  return (
    <div>
      <img
        alt="https://www.innovative-medical.com/hs-fs/hubfs/waldo%202.jpg?width=1024&name=waldo%202.jpg"
        src={picture}
        className="image"
      ></img>
    </div>
  );
};

// https://stackoverflow.com/questions/23744605/javascript-get-x-and-y-coordinates-on-mouse-click
ImageContainer.propTypes = {};

export default ImageContainer;
