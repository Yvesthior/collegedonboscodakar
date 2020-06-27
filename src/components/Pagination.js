import React from "react";

const Pagination = ({
  elementsPerPage,
  totalElements,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul
        className="pagination justify-content-center"
        style={{ cursor: "pointer" }}
      >
        <li className={currentPage === 1 ? "disabled page-item" : "page-item"}>
          <span onClick={() => paginate(currentPage - 1)} className="page-link">
            Page précédente
          </span>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "active page-item" : "page-page-item"
            }
          >
            <span onClick={() => paginate(number)} className=" page-link">
              {" "}
              {number}
            </span>
          </li>
        ))}
        <li
          className={
            currentPage === pageNumbers.length
              ? "disabled page-item"
              : "page-item"
          }
        >
          <span onClick={() => paginate(currentPage + 1)} className="page-link">
            Page suivante
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
