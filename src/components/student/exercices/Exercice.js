import React from "react";
import { Link } from "react-router-dom";

export default function Exercice({ exercice }) {
  const { nom, prenom } = JSON.parse(localStorage.getItem("user"));
  const displayName = `${nom.toLowerCase()}-${prenom
    .replace(" ", "-")
    .toLowerCase()}`;
  return (
    <React.Fragment>
      <div className="col-md-5 col-lg-3 col-sm-12 m-1 p-3">
        <div className="card" style={{ height: 200 }}>
          <div
            className="card-header text-nowrap text-truncate"
            data-toggle="tooltip"
            data-placement="top"
            title={`${exercice.matiere.nom} ${exercice.nom}`}
          >
            <Link to={`/eleves/${displayName}/exercices/${exercice.id}`}>
              {" "}
              {exercice.matiere.nom} : {exercice.nom}{" "}
            </Link>
          </div>
          <div
            className="card-body text-nowrap text-truncate"
            style={{ position: "relative" }}
          >{`${exercice.description}`}</div>
          <div className="card-footer">
            <button className="btn btn-outline-info offset-lg-1 offset-3 offset-md-2">
              <a href={exercice.docurl}>
                {" "}
                <i className="fas fa-eye"></i> Visualiser
              </a>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
