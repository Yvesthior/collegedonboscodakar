import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Teacher from "./teacher";

import { DataContext } from "../../../providers/DataProvider";
import Navbar from "../Navbar";
// import { UserContext } from "../../../providers/UserProvider";

const Teachers = () => {
  const { teachers } = useContext(DataContext);
  // const user = useContext(UserContext);
  // console.log(user);
  return (
    <React.Fragment>
      <Navbar />
      <TeacherWrapper>
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-12 pb-5">
              <h2>Liste des Enseignants</h2>
            </div>
          </div>
        </div>
        <div className=" container bg-light center-p">
          <div className="row d-flex">
            <div className="col-12">
              <Link to="/admin/enseignants/add">
                <button className="btn btn-success float-right m-3">
                  <i className="fas fa-user-plus"></i> Ajouter un Enseignant
                </button>
              </Link>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Matière</th>
                <th scope="col">Mail</th>
                <th scope="col">options</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <Teacher {...teacher} key={teacher.id} />
              ))}
            </tbody>
          </table>
        </div>
      </TeacherWrapper>
    </React.Fragment>
  );
};

const TeacherWrapper = styled.div`
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
export default Teachers;
