import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { firestore } from "../../../firebase";
import { collectIdsAndDocs } from "../../../utilities";
import NavbarEleve from "../NavbarEleve";

class CoursePageEleve extends Component {
  state = {
    course: [],
    displayName: "",
  };

  imageInput = null;

  get courseId() {
    return this.props.match.params.id;
  }

  get courseRef() {
    return firestore.doc(`cours/${this.courseId}`);
  }

  unsubscribeFromCourse = null;
  componentDidMount() {
    const displayName = localStorage.getItem("displayName");
    this.setState({ displayName });
  }

  componentWillMount = async () => {
    this.unsubscribeFromCourse = this.courseRef.onSnapshot((snapshot) => {
      const course = collectIdsAndDocs(snapshot);
      this.setState({ course });
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromCourse();
  }

  render() {
    const { course } = this.state;
    return (
      <React.Fragment>
        <NavbarEleve />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <Link to={`/eleves/${this.state.displayName}/cours`}>
                {" "}
                <button className="btn btn-lg btn-outline-secondary">
                  {" "}
                  <i className="fas fa-arrow-left"></i> Retour
                </button>
              </Link>
            </div>
            <div className="col-md-6 offset-2">
              <h2 className="text-center">Cours : {course.nom}</h2>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="card p-5">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="nom">Nom : </label>
                <input
                  type="text"
                  value={course.nom}
                  className="form-control"
                  id="nom"
                  onChange={this.handleChange}
                  name="nom"
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="description">Description : </label>
                <textarea
                  type="text"
                  value={course.description}
                  className="form-control"
                  onChange={this.handleChange}
                  id="description"
                  name="description"
                  readOnly
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions : </label>
              <textarea
                type="textarea"
                value={course.instructions}
                className="form-control"
                onChange={this.handleChange}
                id="instructions"
                name="instructions"
                readOnly
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-info offset-5">
                <a href={course.docurl}>
                  {" "}
                  <i className="fas fa-eye"></i> Visualiser le document
                </a>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(CoursePageEleve);
