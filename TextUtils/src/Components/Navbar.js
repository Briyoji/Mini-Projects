import React from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/about">
                About
              </NavLink>
            </li>
          </ul>
          <div className="theme-icons">
            {props.theme.themes.map((themeInfo) => (
              <div
                className="theme-icon"
                key={`${themeInfo.name}-theme-icon`}
                onClick={(e) => props.theme.toggle(themeInfo.name)}
                style={{ backgroundColor: themeInfo.bgcolor }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Set title here",
};

export default Navbar;
