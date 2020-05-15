import React from "react";
import { Link } from "react-router-dom";

export default function Exercice({ exercice }) {
  return (
    <React.Fragment>
      <div className="col-3 m-2 p-3">
        <div className="card">
          <div className="card-header">
            <Link to={`/enseignants/exercices/${exercice.id}`}>
              {" "}
              {exercice.matiere.nom} : {exercice.nom}{" "}
            </Link>
          </div>
          <div className="card-body">{`${exercice.description} ${exercice.instructions}`}</div>
          <div className="card-footer">
            <p className="text-center">Classe: {exercice.classe.sigle}</p>

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
