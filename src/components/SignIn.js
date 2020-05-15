import React, { Component } from "react";
import { signInWithGoogle, signInWithEmail } from "../firebase";

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
      <div className="row mt-5">
        <div className="card col-5 offset-3">
          <div className="card-header">
            <h2>Connexion</h2>
          </div>
          <div className="card-body text-center">
            <form className="form" onSubmit={this.handleSubmit}>
              <input
                type="email"
                className="form-control col-7"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                className="form-control col-7"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              <input type="submit" value="Sign In" />
              <button onClick={signInWithGoogle}>Sign In With Google</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
