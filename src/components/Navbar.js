import React from "react";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const display = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Find Waldo
      </a>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
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
