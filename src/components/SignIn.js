import React, { Component } from "react";
import { signInWithEmail } from "../firebase";

class SignIn extends Component {
  state = { email: "", password: "" };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    signInWithEmail(email, password).then((user) => user);

    this.setState({ email: "", password: "" });
  };

  togglePassword = () => {
    const passwordField = document.getElementById("password");
    passwordField.type === "password"
      ? (passwordField.type = "text")
      : (passwordField.type = "password");
  };

  render() {
    const { email, password } = this.state;

    return (
      <React.Fragment>
        <div className="card mt-5">
          <div className="card-header">
            <h2 className="text-center">
              {" "}
              <img
                src="https://img.icons8.com/cute-clipart/64/000000/login-rounded-right.png"
                alt=""
                style={{ marginBottom: 5, paddingRight: 10 }}
              />{" "}
              Connexion
            </h2>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  {" "}
                  <img
                    src="./email.png"
                    alt=""
                    style={{ marginBottom: 10, paddingRight: 10 }}
                  />
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Looks not good!</div>
              </div>
              <div className="form-group">
                <img
                  src="./password.png"
                  alt=""
                  style={{ marginBottom: 10, paddingRight: 10 }}
                />
                <label htmlFor="password">Mot de Passe</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <div>
                  <input type="checkbox" onClick={this.togglePassword} /> Voir
                  le Mot de Passe
                </div>
              </div>
              <div className="col">
                <button className="btn btn-primary offset-5" type="submit">
                  <i className="fas fa-sign-in-alt"></i> Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignIn;
