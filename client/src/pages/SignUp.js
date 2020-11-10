import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import "../styles/Login.css";

class SignUp extends Component {
  // TODO Integrate Auth
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <TextInput
            placeholder="Your Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <TextInput
            placeholder="Your Name"
            name="name"
            value={name}
            type="text"
            onChange={this.handleChange}
          />
          <TextInput
            placeholder="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign Up</button>
          <p>
            If you already have an account please visit our{" "}
            {<Link to="/login">Login</Link>} page
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
