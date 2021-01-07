import ReactDOM from "react-dom";
import { Fragment } from "react";

const Popup = (props) => {
  return (
    <Fragment>
      <div className="popup">
        <div className="popup_inner">
          <h1>Find the Lion (actual animal), the Astronaut, and the Hippo</h1>
          <button onClick={props.toggle}>close me</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Popup;
