import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Course({ course }) {
  const { nom, prenom } = JSON.parse(localStorage.getItem("user"));
  const displayName = `${nom.toLowerCase()}-${prenom
    .replace(" ", "-")
    .toLowerCase()}`;
  return (
    <React.Fragment>
      <div className="col-md-5 col-lg-3 col-sm-12 m-1 p-3">
        <div className="card" style={{ height: 120 }}>
          <div
            className="card-header text-nowrap text-truncate"
            style={{ display: "inline-block", maxHeight: 100 }}
            data-toggle="tooltip"
            data-placement="top"
            title={`${course.matiere.nom} ${course.nom}`}
          >
            <Link to={`/eleves/${displayName}/cours/${course.id}`}>
              {" "}
              {course.matiere.nom} : {course.nom}{" "}
            </Link>
          </div>
          <div className="card-body" style={{ position: "relative" }}>
            <button
              className="btn btn-outline-info offset-lg-1 offset-3 offset-md-2
              mb-2"
              style={{ position: "absolute", bottom: 0 }}
            >
              <a href={course.docurl}>
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
