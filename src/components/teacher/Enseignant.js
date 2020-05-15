import React, { Component } from "react";
import Navbar from "../Navbar";

export default class Enseignant extends Component {
  render() {
    return (
      <div>
        <Navbar profil="enseignant" />
        <h1>Hello from Enseignant Home Page</h1>
      </div>
    );
  }
}
