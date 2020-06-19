import React from "react";
import Signup from "../../SignUp";
import Navbar from "../Navbar";

export default function NewStudent() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid col-8 offset-2 mt-5">
        <Signup />
      </div>
    </div>
  );
}
