import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Dropdown from "../components/Dropdown";

import MaleSwitch from "../components/MaleSwitch";
import FemaleSwitch from "../components/FemaleSwitch";

import { __CreateProfile } from "../services/ProfileServices";

const options = [
  "Lose .5 Ib a week",
  "Lose 1 Ib a week",
  "Lose 1.5 Ibs a week",
  "Lose 2 Ibs a week",
  "Gain .5 Ib a week",
  "maintain",
  "Gain 1 Ib a week",
  "Gain 1.5 Ibs a week",
  "Gain 2 Ibs a week",
];

const genders = ["male", "female"];

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
      profileFetchError: false,
    };
  }

  componentDidMount() {}

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(target);
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
    } catch (error) {
      console.log("errorrrrr");
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const gender = this.state.gender;

    if (gender === "male") {
      MaleSwitch(this.state, this.handleRecCal);
    } else if (gender === "female") {
      FemaleSwitch(this.state, this.handleRecCal);
    }
    setTimeout(() => this.createProfile(), 500);
  };

  render() {
    console.log(this.props.currentUser._id);
    const {
      gender,
      age,
      height,
      weight,
      goalWeight,
      weeklyGoal,
      activityLevel,
      recCalIntake,
    } = this.state;
    return (
      <div>
        <h3>Create Profile</h3>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <p>Please enter in the following information</p>
            <div className="dropdown-wrapper">
              <Dropdown
                className="dropdown"
                placeholder="Weekly Goal"
                options={options}
                value={weeklyGoal}
                onChange={this.handleGoalDropDown}
              />
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
              name="age"
              type="number"
              value={age}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="HEIGHT IN INCHES"
              name="height"
              type="number"
              value={height}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="WEIGHT IN IBS"
              name="weight"
              type="number"
              value={weight}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="GOAL WEIGHT"
              name="goalWeight"
              type="number"
              value={goalWeight}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
