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
      this.setState({
        description: "",
        calsBurned: 0,
        activityLevel: "",
        duration: "",
      });
    } catch (error) {
      throw error;
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getCalsBurned = (props) => {
    this.setState({ calsBurned: props });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.activityLevel && this.state.duration) {
      this.setState({ error: false });
      METCalc(this.state, this.getCalsBurned);
    } else {
      this.setState({ error: true });
    }
  };

  handleCreateExercise = (e) => {
    e.preventDefault();
    this.createExercise();
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
                placeholder="Intensity"
                options={activityLevels}
                value={activityLevel}
                onChange={this.handleActivityDropDown}
              />
              <Dropdown
                className="dropdown"
                placeholder="Duration"
                options={Duration}
                value={duration}
                onChange={this.handleDurationDropDown}
              />
            </div>
            <button className="profile-button" type="submit">
              Calculate
            </button>
            <div>
              {calsBurned ? (
                <div>
                  <h4>Calories Burned: {calsBurned}</h4>
                  <button
                    onClick={this.createExercise}
                    className="profile-button"
                    type="submit"
                  >
                    Add Exercise
                  </button>
                </div>
              ) : null}
              {this.state.error ? <p>Please fill in all fields</p> : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddExercise;
