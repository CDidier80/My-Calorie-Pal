import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to My Calorie Pal</h1>
      <div className="grid-home">
        <div className="overview-wrapper">
          <ul>
            <h3 className="underline">Lose weight with MyCaloriePal</h3>
            <h4 className="grid-home">
              <li className="list">Log Meals/Food consumed</li>
              <li className="list">Log Exercises</li>
              <li className="list">Count Calories</li>
              <li className="list">Track Calories Burned</li>
              <li className="list">Track Macros</li>
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
