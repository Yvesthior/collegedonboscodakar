import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Teacher from "./teacher";
import Pagination from "../../Pagination";
import Scroll from "../../Scroll";

import { DataContext } from "../../../providers/DataProvider";
import Navbar from "../Navbar";
import { useState } from "react";

const Teachers = () => {
  const { teachers } = useContext(DataContext);
  const [word, setWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage, setTeachersPerPage] = useState(5);

  const handleChange = (e) => setWord(e.target.value);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.nom.toLowerCase().includes(word.toLowerCase()) ||
      teacher.prenom.toLowerCase().includes(word.toLowerCase())
  );

  //Get current teachers

  const indexOfLastteacher = currentPage * teachersPerPage;
  const indexOfFirstteacher = indexOfLastteacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstteacher,
    indexOfLastteacher
  );

  //change Page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="container">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="search"
                id="search"
                placeholder="Rechercher un enseignant"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className=" container bg-light center-p">
          <div className="row d-flex">
            <div className="col-4 form-group row mt-1 p-3">
              <label
                htmlFor="FormControlSelect1"
                className="col-6 col-form-label"
              >
                Lignes par Page :{" "}
              </label>
              <select
                className="form-control col-6 d-inline"
                id="FormControlSelect1"
                onChange={(e) => setTeachersPerPage(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="col-8">
              <Link to="/admin/enseignants/add">
                <button className="btn btn-success float-right m-3">
                  <i className="fas fa-user-plus"></i> Ajouter un Enseignant
                </button>
              </Link>
            </div>
          </div>
          <Scroll>
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
                {currentTeachers.map((teacher) => (
                  <Teacher {...teacher} key={teacher.id} />
                ))}
              </tbody>
            </table>
          </Scroll>
          <Pagination
            elementsPerPage={teachersPerPage}
            totalElements={teachers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
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
