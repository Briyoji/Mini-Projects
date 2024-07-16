import React from "react";
import { NavLink } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            NewsMonkey
          </a>
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
              {props.categories.map((category) => (
                <li className="nav-item" key={category}>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={`/${category}`}
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <LoadingBar color="#f11946" progress={props.loaderProgress} />
    </>
  );
}
