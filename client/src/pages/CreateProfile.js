import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Dropdown from "../components/Dropdown";

import MaleSwitch from "../components/MaleSwitch";
import FemaleSwitch from "../components/FemaleSwitch";
import WeeklyGoalSwitch from "../components/WeeklyGoalSwitch";

import { __CreateProfile, __GetProfile } from "../services/ProfileServices";

const options = [
  "Lose 2 lbs a week",
  "Lose 1.5 lbs a week",
  "Lose 1 lb a week",
  "Lose .5 lb a week",
  "Maintain Current Weight",
  "Gain .5 lb a week",
  "Gain 1 lb a week",
  "Gain 1.5 lbs a week",
  "Gain 2 lbs a week",
];

const genders = ["Male", "Female"];

const activityLevels = ["sedentary", "moderately active", "active"];

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      age: "",
      height: "",
      weight: "",
      goalWeight: "",
      weeklyGoal: "",
      activityLevel: "",
      recCalIntake: "",
      formError: false,
    };
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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleGenderDropDown = ({ label }) => {
    this.setState({ gender: label });
  };

  handleGoalDropDown = ({ label }) => {
    this.setState({ weeklyGoal: label });
  };

  handleActivityDropDown = ({ label }) => {
    this.setState({ activityLevel: label });
  };

  handleRecCal = (props) => {
    this.setState({ recCalIntake: props });
  };

  createProfile = async () => {
    try {
      await __CreateProfile(this.state, this.props.currentUser._id);
      this.props.history.push("/profile");
    } catch (error) {
      this.setState({ formError: true });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const gender = this.state.gender;

    if (gender === "Male") {
      MaleSwitch(this.state, this.handleRecCal);
    } else if (gender === "Female") {
      FemaleSwitch(this.state, this.handleRecCal);
    }

    setTimeout(() => WeeklyGoalSwitch(this.state, this.handleRecCal), 5);
    setTimeout(() => {
      if (
        this.state.recCalIntake &&
        this.state.weight &&
        this.state.goalWeight &&
        this.state.height &&
        this.state.weeklyGoal
      ) {
        this.createProfile();
      } else {
        this.setState({ formError: true });
      }
    }, 10);
  };

  render() {
    const {
      gender,
      age,
      height,
      weight,
      goalWeight,
      weeklyGoal,
      activityLevel,
      formError,
    } = this.state;
    return (
      <div>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <p>Please enter in the following information</p>
            <div className="dropdown-wrapper">
              <Dropdown
                className="dropdown"
                placeholder="Gender"
                options={genders}
                value={gender}
                onChange={this.handleGenderDropDown}
              />
              <Dropdown
                className="dropdown"
                placeholder="Activity Level"
                options={activityLevels}
                value={activityLevel}
                onChange={this.handleActivityDropDown}
              />
            </div>
            <TextInput
              placeholder="AGE"
              title="AGE"
              name="age"
              type="number"
              value={age}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="HEIGHT IN INCHES"
              title="HEIGHT"
              name="height"
              type="number"
              value={height}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="WEIGHT IN IBS"
              title="WEIGHT"
              name="weight"
              type="number"
              value={weight}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="GOAL WEIGHT"
              title="GOAL WEIGHT"
              name="goalWeight"
              type="number"
              value={goalWeight}
              onChange={this.handleChange}
            />
            <div className="dropdown-wrapper">
              <Dropdown
                className="goal-dropdown"
                placeholder="Weekly Goal"
                options={options}
                value={weeklyGoal}
                onChange={this.handleGoalDropDown}
              />
            </div>
            {formError ? <p>Please fill in all fields</p> : null}
            <button className="profile-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
