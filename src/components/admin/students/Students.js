import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";

export default class Teachers extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <StudentWrapper>
          <div className="container mt-4 ">
            <div className="row">
              <div className="col-12 pb-5">
                <h2>Liste des Élèves</h2>
              </div>
            </div>
          </div>
          <div className=" container bg-light center-p">
            <div className="row d-flex">
              <div className="col-12">
                <Link to="/enseignants/add">
                  <button className="btn btn-success float-right m-3">
                    <i className="fas fa-user-plus    "></i> Ajouter un Élève
                  </button>
                </Link>
              </div>
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Classe</th>
                    <th scope="col">age</th>
                    <th scope="col">sexe</th>
                    <th scope="col">options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>THIOR</td>
                    <td>Jean Marcelin</td>
                    <td>3ème C</td>
                    <td>16 ans</td>
                    <td>masculin</td>
                    <td>
                      <button className="btn btn-secondary">
                        {" "}
                        <i className="fas fa-edit"></i> Modifier
                      </button>{" "}
                      <button className="btn btn-danger">
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Supprimer
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>THIOR </td>
                    <td>Yvette jeannine</td>
                    <td>Seconde S</td>
                    <td>16 ans</td>
                    <td>masculin</td>
                    <td>
                      <button className="btn btn-secondary">
                        {" "}
                        <i className="fas fa-edit"></i> Modifier
                      </button>{" "}
                      <button className="btn btn-danger">
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Supprimer
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>THIOR </td>
                    <td>Marie Victoire</td>
                    <td>4ème B</td>
                    <td>15 ans</td>
                    <td>masculin</td>
                    <td>
                      <button className="btn btn-secondary">
                        {" "}
                        <i className="fas fa-edit"></i> Modifier
                      </button>{" "}
                      <button className="btn btn-danger">
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </StudentWrapper>
      </React.Fragment>
    );
  }
}

const StudentWrapper = styled.div`
  .center-p {
    border-radius: 20px;
  }
  h2 {
    text-align: center;
  }
  table {
    text-align: center;
  }
`;
