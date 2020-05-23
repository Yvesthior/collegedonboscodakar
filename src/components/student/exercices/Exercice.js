import React from "react";
import { Link } from "react-router-dom";

export default function Exercice({ exercice }) {
  return (
    <React.Fragment>
      <div className="col-3 m-2 p-3">
        <div className="card">
          <div className="card-header">
            <Link to={`/eleves/exercices/${exercice.id}`}>
              {" "}
              {exercice.matiere.nom} : {exercice.nom}{" "}
            </Link>
          </div>
          <div className="card-body">{`${exercice.description}`}</div>
          <div className="card-footer">
            <button className="btn btn-outline-info ml-4">
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
