import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import { __LoginUser } from "../services/UserServices";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      formError: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await __LoginUser(this.state);
      this.props.toggleAuthenticated(true, loginData.user, () =>
        this.props.history.push("/profile")
      );
    } catch (error) {
      this.setState({ formError: true });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <TextInput
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <TextInput
            placeholder="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
          {this.state.formError ? (
            <p>
              Couldn't find a matching Email and/or Password please enter a
              registered email/password or
            </p>
          ) : null}
          <p>
            If you are a new user please visit our{" "}
            {<Link to="/register">SignUp</Link>} page
          </p>
        </form>
      </div>
    );
  }
}

export default LogIn;
