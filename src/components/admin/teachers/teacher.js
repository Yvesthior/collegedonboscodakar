import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { firestore } from "../../../firebase";

const Teacher = ({ id, email, phoneNumber, matiere, nom, prenom }) => {
  const userRef = firestore.doc(`users/${id}`);
  const remove = () => userRef.delete();

  return (
    <tr>
      <td>{nom}</td>
      <td>{prenom}</td>
      <td>{phoneNumber}</td>
      <td>{matiere}</td>
      <td>{email}</td>
      <td>
        {/* <Link to={`/admin/enseignant/${id}/edit`}>
          <button className="btn btn-secondary">
            {" "}
            <i className="fas fa-edit"></i> Modifier
          </button>
        </Link>{" "}
        <button className="btn btn-danger" onClick={remove}>
          <i className="fa fa-trash" aria-hidden="true"></i> Supprimer
        </button> */}

        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-cog"></i> Options
        </button>
        <div className="dropdown-menu">
          <Link to={`/admin/enseignant/${id}/edit`}>
            <button className="btn btn-secondary dropdown-item">
              <i className="fas fa-edit"></i> Modifier le Profil
            </button>{" "}
          </Link>
          <button
            className="btn btn-secondary dropdown-item"
            onClick={() => {
              axios
                .put(
                  `https://us-central1-donbosco-818dd.cloudfunctions.net/updatePassword`,
                  { id }
                )
                .then((response) => console.log(response));
            }}
          >
            <i className="fas fa-undo-alt"></i> Réinitialiser le Mot de Passe
          </button>{" "}
          <div role="separator" className="dropdown-divider"></div>
          <button className="btn btn-danger dropdown-item" onClick={remove}>
            <i className="fa fa-trash" aria-hidden="true"></i> Supprimer
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Teacher;
