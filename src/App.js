import Popup from "./components/Popup";
import React, { Fragment, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import ImageContainer from "./components/ImageContainer";
import Submenu from "./components/Submenu";
import Radius from "./components/Radius";

function App() {
  const [hideInstructions, setHideInstructions] = useState(true);
  const [submenu, setSubmenu] = useState(false);
  const [radius, setRadius] = useState(false);
  const radii = 65;
  const coordinates = useRef({
    x: 0,
    y: 0,
  });
  const hideInstructionsToggle = () => {
    hideInstructions ? setHideInstructions(false) : setHideInstructions(true);
  };

  const toggleSubmenu = () => {
    submenu ? setSubmenu(false) : setSubmenu(true);
  };

  const toggleRadius = () => {
    radius ? setRadius(false) : setRadius(true);
  };

  const answers = [
    { name: "lion", x: 1609, y: 334, correct: false },
    { name: "astronaut", x: 258, y: 176, correct: false },
    { name: "hippo", x: 595, y: 800, correct: false },
  ];

  const handleClick = (event) => {
    coordinates.current.x = event.pageX;
    coordinates.current.xLowerBound = event.pageX - radii;
    coordinates.current.xUpperBound = event.pageX + radii;
    coordinates.current.y = event.pageY;
    coordinates.current.yLowerBound = event.pageY - radii;
    coordinates.current.yUpperBound = event.pageY + radii;

    toggleSubmenu();
    toggleRadius();

    // must provide coord
    // must toggle a state that triggers popup
    // https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
  };

  const checkAnswer = () => {
    // if the click radius touches the coord where it is
    // being lower bound [x -radii] <= answer.coord.x <= upper bound [x + radii]
  };

  const reportSelection = (event) => {
    console.log("hi");
    let correct = false;
    answers.forEach((answer) => {
      if (answer.name.toLowerCase() === event.target.innerHTML.toLowerCase()) {
        if (
          coordinates.current.xLowerBound <= answer.x &&
          answer.x <= coordinates.current.xUpperBound &&
          coordinates.current.yLowerBound <= answer.y &&
          answer.y <= coordinates.current.yUpperBound
        ) {
          correct = true;
        }
      }
    });

    correct ? console.log("correct") : console.log("incorrect");
  };

  const display = (
    <Fragment>
      {submenu ? (
        <Submenu
          searchItems={answers.map((answer) => answer.name)}
          coordinates={coordinates.current}
          reportSelection={reportSelection}
        />
      ) : (
        ""
      )}
      {radius ? <Radius radii={radii} coordinates={coordinates.current} /> : ""}
      <Navbar toggle={hideInstructionsToggle} />
      {!hideInstructions && <Popup toggle={hideInstructionsToggle} />}
      <div onClick={handleClick}>
        <ImageContainer toggleSubmenu={toggleSubmenu} />
      </div>
    </Fragment>
  );

  return display;
}

export default App;
