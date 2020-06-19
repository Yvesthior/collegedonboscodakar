import React, { useContext } from "react";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignIn";
import { UserContext } from "../providers/UserProvider";
// import SignUp from "./SignUp";

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
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <SignIn />
              </div>
            </div>
            {/* <div className="row">
              <div>
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
            </div> */}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Authentication;
