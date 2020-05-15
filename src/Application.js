import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
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
// import Acceuil from "./components/student/Acceuil";
// import withUser from "./components/withUser";

class App extends Component {
  render() {
    return (
      <div className="">
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/admin/enseignants" component={Teachers} />
          <Route exact path="/admin/enseignants/add" component={AddTeacher} />
          <Route exact path="/admin/classes" component={Classes} />
          <Route exact path="/admin/classes/add" component={AddClasse} />
          <Route exact path="/admin/eleves" component={Students} />

          <Route exact path="/enseignants/cours" component={Courses} />
          <Route exact path="/enseignants/cours/add" component={NouveauCours} />
          <Route exact path="/enseignants/cours/:id" component={CoursePage} />
          <Route exact path="/enseignants/exercices" component={Exercices} />
          <Route
            exact
            path="/enseignants/exercices/:id"
            component={ExercicePage}
          />
          <Route
            exact
            path="/enseignants/exercices/add"
            component={NouvelExercice}
          />

          <Route exact path="/eleves/cours" component={CoursesEleves} />
          <Route exact path="/eleves/exercices" component={ExercicesEleves} />
        </Switch>
      </div>
    );
  }
}

export default App;
