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

  render() {
    const { email, password } = this.state;

    return (
      <React.Fragment>
        <div className="card mt-5">
          <div className="card-header">
            <h2>Connexion</h2>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  value={email}
                  onChange={this.handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Looks not good!</div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de Passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <button className="btn btn-primary offset-5" type="submit">
                  Connexion
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
