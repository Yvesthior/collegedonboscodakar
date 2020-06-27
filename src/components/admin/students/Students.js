import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../providers/DataProvider";
import styled from "styled-components";
import Navbar from "../Navbar";
import Student from "./Student";
import Pagination from "../../Pagination";
import Scroll from "../../Scroll";

const Students = () => {
  // console.log(JSON.parse(localStorage.getItem("students")));
  // const students = JSON.parse(localStorage.getItem("students"));
  // console.log(JSON.parse(localStorage.getItem("students")));

  const { students } = useContext(DataContext);
  const [word, setWord] = useState("");
  const handleSearch = (e) => {
    setWord(e.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);

  const filteredStudents = students.filter(
    (student) =>
      student.nom.toLowerCase().includes(word.toLowerCase()) ||
      student.prenom.toLowerCase().includes(word.toLowerCase())
  );

  //Get current teachers

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  //change Page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="container">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="search"
                id="search"
                placeholder="Rechercher un élève"
                onChange={handleSearch}
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
                onChange={(e) => setStudentsPerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="col-8">
              <Link to="/admin/eleves/nouveauprofil">
                <button className="btn btn-success float-right m-3">
                  <i className="fas fa-user-plus    "></i> Ajouter un Élève
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <Scroll>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Classe</th>
                    <th scope="col">age</th>
                    <th scope="col">options</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
                    <Student student={student} key={student.id} />
                  ))}
                </tbody>
              </table>
            </Scroll>

            <Pagination
              elementsPerPage={studentsPerPage}
              totalElements={students.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </StudentWrapper>
    </React.Fragment>
  );
};

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
export default Students;
