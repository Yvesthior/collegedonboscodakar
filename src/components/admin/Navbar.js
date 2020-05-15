import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="todo">
        COLLEGE SAINT JEAN BOSCO
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="fa fa-home" aria-hidden="true"></i> Acceuil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/enseignants">
              <i className="fa fa-user" aria-hidden="true"></i> Enseignants
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/classes">
              <i className="fas fa-chalkboard" aria-hidden="true"></i> Classes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/eleves">
              <i className="fa fa-users" aria-hidden="true"></i> Elèves
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
