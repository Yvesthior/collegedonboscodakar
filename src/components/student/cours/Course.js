import React from "react";
import { Link } from "react-router-dom";

export default function Course({
  id,
  nom,
  description,
  instructions,
  matiere,
  classe,
  lien,
}) {
  return (
    <React.Fragment>
      <div className="col-3 m-1 p-3">
        <div className="card">
          <div className="card-header">
            <Link to={`/eleves/cours/${id}`}>
              {" "}
              {matiere} : {nom}{" "}
            </Link>
          </div>
          <div className="card-body">
            <button className="btn btn-outline-info ml-4">
              <a href={lien}>
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
