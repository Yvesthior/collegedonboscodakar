import React from "react";
import { Link } from "react-router-dom";

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
        <Link to={`/admin/enseignant/edit/${id}`}>
          <button className="btn btn-secondary">
            {" "}
            <i className="fas fa-edit"></i> Modifier
          </button>
        </Link>{" "}
        <button className="btn btn-danger" onClick={remove}>
          <i className="fa fa-trash" aria-hidden="true"></i> Supprimer
        </button>
      </td>
    </tr>
  );
};

export default Teacher;
