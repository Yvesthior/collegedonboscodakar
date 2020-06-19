import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Classe from "./classe";
// import { DataContext } from "../../../providers/DataProvider";

const Classes = () => {
  // const { classes } = useContext(DataContext);
  const classes = JSON.parse(localStorage.getItem("classes"));
  return (
    <React.Fragment>
      <Navbar />

      <ClassWrapper>
        <div className="container mt-0 ">
          <div className="row">
            <div className="col-12 pb-5">
              <h2>Liste des Classes</h2>
            </div>
          </div>
        </div>
        <div className=" container bg-light center-p">
          <div className="row d-flex">
            <div className="col-12">
              <Link to="/admin/classes/add">
                <button className="btn btn-success float-right m-3">
                  <i className="fas fa-user-plus"></i> Ajouter une Classe
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Sigle</th>
                  <th scope="col">options</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classe) => (
                  <Classe {...classe} key={classe.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ClassWrapper>
    </React.Fragment>
  );
};

const ClassWrapper = styled.div`
  table {
    text-align: center;
  }
`;

export default Classes;
