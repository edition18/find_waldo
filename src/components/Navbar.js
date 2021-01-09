import React from "react";
import PropTypes from "prop-types";
import Timer from "./Timer";

const Navbar = (props) => {
  const display = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand mr-auto" href="#">
        Find Waldo
      </a>

      <ul className="navbar-nav mr-auto center">
        <li className="nav-item">
          <Timer gameover={props.gameover} />
        </li>
      </ul>

      <button
        onClick={props.toggle}
        className="nav-item right btn btn-light"
        href="#"
      >
        <strong>Show Instructions</strong>
      </button>
    </nav>
  );

  return display;
};

Navbar.propTypes = {};

export default Navbar;
