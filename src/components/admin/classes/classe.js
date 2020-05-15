import React from "react";
import { firestore } from "../../../firebase";

import { Link } from "react-router-dom";
// import { DataContext } from "../../../providers/DataProvider";

const Classe = ({ id, nom, sigle }) => {
  const classeRef = firestore.doc(`classes/${id}`);
  const remove = () => classeRef.delete();

  return (
    <tr>
      <td>{nom}</td>
      <td>{sigle}</td>
      <td>
        <Link to={`/admin/classe/edit/${id}`}>
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

export default Classe;
