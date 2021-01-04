import Popup from "./components/Popup";
import React, { Fragment, useState } from "react";
import Navbar from "./components/Navbar";
import ImageContainer from "./components/ImageContainer";

function App() {
  const [hideInstructions, setHideInstructions] = useState(true);
  const hideInstructionsToggle = () => {
    hideInstructions ? setHideInstructions(false) : setHideInstructions(true);
  };

  const display = (
    <Fragment>
      <Navbar />
      {!hideInstructions && <Popup toggle={hideInstructionsToggle} />}
      test
      <ImageContainer />
    </Fragment>
  );

  return display;
}
// https://stackoverflow.com/questions/23744605/javascript-get-x-and-y-coordinates-on-mouse-click
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_mouse_offsetx
export default App;
