import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Dropdown from "../components/Dropdown";

import METCalc from "../components/METCalc";

import { __CreateExercise } from "../services/ExerciseServices";
import { __GetProfile } from "../services/ProfileServices";

const activityLevels = ["Light", "Moderate", "Vigorous"];
const Duration = [
  "15 mins",
  "30 mins",
  "45 mins",
  "1 hour",
  "1.5 hours",
  "2 hours",
];

class AddExercise extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      description: "",
      calsBurned: 0,
      weight: 0,
      activityLevel: "",
      duration: "",
      error: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async (userId) => {
    try {
      const profileData = await __GetProfile(this.props.currentUser._id);
      this.setState({ weight: profileData.profile.weight });
    } catch (error) {
      throw error;
    }
  };

  createExercise = async () => {
    try {
      await __CreateExercise(this.state, this.props.currentUser._id);
      this.setState({ description: "", calsBurned: 0 });
    } catch (error) {
      throw error;
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.activityLevel && this.state.duration
      ? METCalc(this.state)
      : this.setState({ error: true });
    // this.createExercise();
  };

  handleActivityDropDown = ({ label }) => {
    this.setState({ activityLevel: label });
  };

  handleDurationDropDown = ({ label }) => {
    this.setState({ duration: label });
  };

  render() {
    const { description, calsBurned, activityLevel, duration } = this.state;
    return (
      <div>
        <h3>Add Exercise</h3>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <TextInput
              placeholder="Exercise Description"
              name="description"
              type="text"
              value={description}
              onChange={this.handleChange}
            />
            <div className="dropdown-wrapper">
              <Dropdown
                className="dropdown"
                placeholder="Activity Level"
                options={activityLevels}
                value={activityLevel}
                onChange={this.handleActivityDropDown}
              />
              <Dropdown
                className="dropdown"
                placeholder="Exercise Duration"
                options={Duration}
                value={duration}
                onChange={this.handleDurationDropDown}
              />
            </div>
            <button className="profile-button" type="submit">
              Submit
            </button>
            <div>
              {this.state.error ? <p>Please fill in all fields</p> : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddExercise;
