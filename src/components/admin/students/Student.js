import React from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../../firebase";
import axios from "axios";
export default function Student(student) {
  const displayName = localStorage.getItem("displayName");
  const { id, age, nom, prenom, classename } = student.student;
  const studentRef = firestore.doc(`users/${id}`);
  const remove = () => studentRef.delete();
  return (
    <tr>
      <td style={{ width: "5%" }}>{nom}</td>
      <td style={{ width: "30%" }}>{prenom}</td>
      <td style={{ width: "10%" }}>{classename}</td>
      <td style={{ width: "10%" }}>{age}</td>
      <td style={{ width: "40%" }}>
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
          <Link to={`/admin/${displayName}/eleves/${id}/edit`}>
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
}

// <Link to={`/admin/${displayName}/eleves/${id}/edit`}>
//           <button className="btn btn-secondary">
//             {" "}
//             <i className="fas fa-edit"></i> Modifier Mdp
//           </button>
//         </Link>{" "}
//         <button className="btn btn-danger">
//           <i className="fa fa-trash" aria-hidden="true"></i> Supprimer
//         </button>
