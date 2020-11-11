import React, { Component } from "react";
import { Link } from "react-router-dom";
import { __GetProfile } from "../services/ProfileServices";
import "../styles/Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      const profileData = await __GetProfile(this.props.currentUser._id);
      this.setState(profileData.profile);
    } catch (error) {
      throw error;
    }
  };

  render() {
    // console.log(this.props.currentUser);
    const {
      age,
      gender,
      goalWeight,
      height,
      recCalIntake,
      weeklyGoal,
      weight,
    } = this.state;
    return (
      <div>
        <h1>{this.props.currentUser.name}'s Profile</h1>
        <div className="profile grid-rows">
          <form className="profile-form">
            <div className="info"> Age: {age} </div>
            <div className="info"> Gender: {gender} </div>
            <div className="info"> Height: {height}in </div>
            <div className="info"> Current Weight: {weight} </div>
            <div className="info"> Goal Weight: {goalWeight} </div>
            <div className="info"> Weekly Goal: {weeklyGoal} </div>
            <div className="info">
              {" "}
              Recommended Daily Calories: {recCalIntake}{" "}
            </div>
          </form>
          <div className="hero button">
            <div className="hero-action spacing">
              {<Link to="/create/profile">Update Profile</Link>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
