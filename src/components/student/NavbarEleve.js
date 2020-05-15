import React from "react";

import { Link } from "react-router-dom";

const NavbarEleve = () => {
  return (
    <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="todo">
        COLLEGE SAINT JEAN BOSCO DAKAR
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
              <i className="fa fa-home" aria-hidden="true"></i> Mon Espace
              Personnel
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/eleves/cours">
              <i className="fas fa-chalkboard" aria-hidden="true"></i> Mes Cours
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/eleves/exercices">
              <i className="fa fa-users" aria-hidden="true"></i> Mes Exercices
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarEleve;
