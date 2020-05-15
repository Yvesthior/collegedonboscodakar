import React from "react";
import Navbar from "./admin/Navbar";
import NavbarProfesseur from "./teacher/NavbarProfesseur";
import { signOut } from "../firebase";

import { Link } from "react-router-dom";
import NavbarEleve from "./student/NavbarEleve";

const CurrentUser = ({
  uid,
  displayName,
  photoURL,
  email,
  nom,
  prenom,
  children,
  phoneNumber,
  type,
}) => {
  const nomComplet = `${prenom} ${nom}`;

  return (
    <React.Fragment>
      {type === "administrateur" ? (
        <Navbar />
      ) : type === "professeur" ? (
        <NavbarProfesseur />
      ) : type === "eleve" ? (
        <NavbarEleve />
      ) : (
        ""
      )}
      <section className="col-8 offset-2 mt-5" style={{}}>
        <div className="card">
          <div className="card-header">
            <h2>Bonjour {nomComplet}</h2>
          </div>
          <div className="card-body">
            <h3 className="text-center">Tes Informations</h3>
            <br />
            <div className="row">
              <div className="col-md-6">
                {" "}
                <label htmlFor="nom">Prénom(s) et Nom: </label>
                <p className="form-control" name="nom">
                  {nomComplet}
                </p>
              </div>
              <div className="col-md-6">
                {" "}
                <label htmlFor="telephone">Téléphone : </label>
                <p className="form-control" name="pretelephonenom">
                  {phoneNumber}
                </p>
              </div>
              <div className="col-md-6">
                {" "}
                <label htmlFor="email">Email : </label>
                <p className="form-control" name="email">
                  {email}
                </p>
              </div>
              <div className="col-md-6">
                {" "}
                <label htmlFor="profil">Profil : </label>
                <p className="form-control" name="profil">
                  {type}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link to={`/user/profil/edit/${uid}`}>
              <button className="btn btn-primary">
                <i className="fas fa-edit"></i> Modifier Mon Profil
              </button>
            </Link>
            <button className="btn btn-danger offset-7" onClick={signOut}>
              <i className="fas fa-door-open"></i> Me déconnecter
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

CurrentUser.defaultProps = {
  displayName: "Bill Murray",
  email: "billmurray@mailinator.com",
  photoURL: "https://www.fillmurray.com/300/300",
  createdAt: new Date(),
};

export default CurrentUser;
