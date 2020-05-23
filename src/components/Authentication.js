import React, { useContext } from "react";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import { UserContext } from "../providers/UserProvider";
import SignUp from "./SignUp";

const Authentication = ({ loading }) => {
  const user = useContext(UserContext);

  if (loading) return null;

  return (
    <div>
      {user ? (
        <CurrentUser {...user} />
      ) : (
        <React.Fragment>
          <div className="container-fluid">
            <div className="mt-3">
              <h1 className="text-center">Collège Saint Jean Bosco de Dakar</h1>
              <p className="text-center">
                Inscrivez votre Enfant scolarisé à l'école afin d'accéder à la
                Plateforme
              </p>
            </div>
            <div className="row mt-5">
              <div className="col-md-4">
                <SignIn />
              </div>
              <div className="col-md-6 offset-1">
                <SignUp />
              </div>
            </div>
            <div className="row">
              <div className="text-center offset-4 mt-3">
                <p>
                  Vous pouvez retrouver le guide complet de la plateforme à
                  l'adresse suivante :{" "}
                  <a
                    href="https://youtu.be/2x4hh0oA8ss"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://youtu.be/2x4hh0oA8ss
                  </a>
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Authentication;
