import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      quote: {},
    };
  }
  componentDidMount() {
    this.getMessage();
  }
  getMessage = async () => {
    let randomNum = Math.floor(Math.random() * 1000);
    try {
      let response = await Axios.get("https://type.fit/api/quotes");
      this.setState({ quote: response.data[randomNum] });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { quote } = this.state;
    return (
      <div className="hero flex-col">
        <div className="hero-message">
          <p>{quote.text}</p>
          <p>{quote.author}</p>
        </div>
        <div className="hero-action">
          <Link to="/addfood">Diary</Link>
        </div>
      </div>
    );
  }
}

export default Hero;
