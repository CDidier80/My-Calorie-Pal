import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <h1 className="blue-background">Welcome to My Calorie Pal</h1>
      <div className="grid-home">
        <div className="overview-wrapper">
          <ul>
            <h3>Overview</h3>
            <h4>
              <li className="list">Lose weight with MYCaloriePal</li>
              <li className="list">Track Calories</li>
              <li className="list">Track Macros</li>
              <li className="list">Track Exercise</li>
            </h4>
          </ul>
        </div>
        <div className="hero buttons">
          <div>
            <h3>If you are an existing user please login</h3>
            <div className="hero-action spacing">
              {<Link to="/login">Login</Link>}
            </div>
          </div>
          <div>
            <h3>If you are a new user please sign up</h3>
            <div className="hero-action spacing">
              {<Link to="/register">SignUp</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
