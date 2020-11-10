import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <header>
      <div className="icon">
        <nav>
          <NavLink className="nav-active" to="/meals">
            Add Meal
          </NavLink>
          <NavLink className="nav-active" to="/profile">
            Profile
          </NavLink>
          <NavLink
            className="nav-active"
            to="/"
            onClick={() => localStorage.clear()}
          >
            Sign out
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
