import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

const Submenu = (props) => {
  const [renderCoordinates, setRenderCoordinates] = useState({ x: 0, y: 0 }); // this needs a state to render coordinates
  // useEffect(() => {
  //   setRenderCoordinates({
  //     ...renderCoordinates,
  //     x: props.coordinates.x,
  //     y: props.coordinates.y,
  //   });
  // }, [renderCoordinates, props.coordinates.x, props.coordinates.y]);

  return (
    <div
      className="positioned"
      style={{ left: props.coordinates.x, top: props.coordinates.y }}
    >
      <ul className="submenuUl">
        {props.answers.length === 0 ? (
          <li>Loading</li>
        ) : (
          props.answers.map((item) => (
            <li
              onClick={props.reportSelection}
              key={uniqid()}
              className="submenuItem"
            >
              {item.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

Submenu.propTypes = {};

export default Submenu;
