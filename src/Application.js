import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import Teachers from "./components/admin/teachers/Teachers";
import AddTeacher from "./components/admin/teachers/AddTeacher";
import Classes from "./components/admin/classes/Classes";
import AddClasse from "./components/admin/classes/AddClasse";
import Students from "./components/admin/students/Students";
import Authentication from "./components/Authentication";
import Courses from "./components/teacher/cours/Courses";
import NouveauCours from "./components/teacher/cours/NouveauCours";
import Exercices from "./components/teacher/exercices/Exercices";
import NouvelExercice from "./components/teacher/exercices/NouvelExercice";
import CoursesEleves from "./components/student/cours/Courses";
import ExercicesEleves from "./components/student/exercices/Exercices";
import CoursePage from "./components/teacher/cours/CoursePage";
import ExercicePage from "./components/teacher/exercices/ExercicePage";
import CoursePageEleve from "./components/student/cours/CoursePageEleve";
import ExercicePageEleve from "./components/student/exercices/ExercicePageEleve";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="">
        <Switch>
          <Route exact path="/" component={Authentication} />
          <PrivateRoute exact path="/admin/enseignants" component={Teachers} />
          <PrivateRoute
            exact
            path="/admin/enseignants/add"
            component={AddTeacher}
          />
          <PrivateRoute exact path="/admin/classes" component={Classes} />
          <PrivateRoute exact path="/admin/classes/add" component={AddClasse} />
          <PrivateRoute exact path="/admin/eleves" component={Students} />
          <PrivateRoute exact path="/admin/cours" component={Courses} />
          <PrivateRoute
            exact
            path="/admin/cours/add"
            component={NouveauCours}
          />
          <PrivateRoute exact path="/admin/cours/:id" component={CoursePage} />
          <PrivateRoute exact path="/admin/eleves" component={Students} />
          <PrivateRoute exact path="/admin/exercices" component={Exercices} />
          <PrivateRoute
            exact
            path="/admin/exercices/add"
            component={NouvelExercice}
          />
          <PrivateRoute
            exact
            path="/admin/exercices/:id"
            component={ExercicePage}
          />

          {/* <Route exact path="/enseignants/cours" component={Courses} /> */}
          <PrivateRoute path="/enseignants/cours" component={Courses} />

          <PrivateRoute
            exact
            path="/enseignants/cours/add"
            component={NouveauCours}
          />
          <PrivateRoute
            exact
            path="/enseignants/cours/:id"
            component={CoursePage}
          />
          <PrivateRoute
            exact
            path="/enseignants/exercices"
            component={Exercices}
          />

          <PrivateRoute
            exact
            path="/enseignants/exercices/add"
            component={NouvelExercice}
          />
          <PrivateRoute
            exact
            path="/enseignants/exercices/:id"
            component={ExercicePage}
          />

          <PrivateRoute exact path="/eleves/cours" component={CoursesEleves} />
          <PrivateRoute
            exact
            path="/eleves/exercices"
            component={ExercicesEleves}
          />
          <PrivateRoute
            exact
            path="/eleves/cours/:id"
            component={CoursePageEleve}
          />
          <PrivateRoute
            exact
            path="/eleves/exercices/:id"
            component={ExercicePageEleve}
          />
          <Route
            render={() => (
              <div>
                <h1> Oups la page que tu cherches semble ne pas exister</h1>
                <Link to="/">
                  <button className="btn btn-primary btn-lg">
                    <i className="fa fa-home" aria-hidden="true"></i> Revenir à
                    l'acceuil
                  </button>
                </Link>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
