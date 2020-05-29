import React from "react";
import { Link } from "react-router-dom";

export default function Redirection() {
  return (
    <div>
      <h1>vous n'etes pas connecte</h1>
      <p>cliquez sur le boutton en dessous puor vous connecter</p>
      <Link to="/">
        <button> aller a lacceuil</button>
      </Link>
    </div>
  );
}
