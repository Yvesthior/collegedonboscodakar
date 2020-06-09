import React from "react";
import { Link } from "react-router-dom";

export default function Course({ cours }) {
  const { nom, prenom } = JSON.parse(localStorage.getItem("user"));
  const displayName = `${nom.toLowerCase()}-${prenom
    .replace(" ", "-")
    .toLowerCase()}`;
  return (
    <React.Fragment>
      <div className="col-3 m-2 p-3">
        <div className="card">
          <div className="card-header">
            <Link to={`/enseignants/${displayName}/cours/${cours.id}`}>
              {" "}
              {cours.matiere.nom} : {cours.nom}{" "}
            </Link>
          </div>
          <div className="card-body">
            <p className="text-center">Classe: {cours.classe.sigle}</p>

            <button className="btn btn-outline-info ml-4">
              <a href={cours.docurl}>
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
