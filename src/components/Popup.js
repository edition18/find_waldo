import ReactDOM from "react-dom";
import { Fragment } from "react";

const Popup = (props) => {
  return (
    <Fragment>
      <div className="popup">
        <div className="popup_inner">
          <ul>
            FInd
            <li>Lion</li>
            <li>Astronaut</li>
            <li>Hippo</li>
          </ul>
          <button onClick={props.toggle}>close me</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Popup;
