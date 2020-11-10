import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Dropdown from "../components/Dropdown";
import MaleSedentarySwitch from "../components/MaleSedentarySwitch";
import MaleModActiveSwitch from "../components/MaleModActiveSwitch";
import MaleActiveSwitch from "../components/MaleActiceSwitch";
import FemaleSedentarySwitch from "../components/FemaleSedentarySwitch";
import FemaleModActiveSwitch from "../components/FemaleModActiveSwitch";
import FemaleActiveSwitch from "../components/FemaleActiveSwitch";

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const gender = this.state.gender;
    const activityLevel = this.state.activityLevel;
    if (gender === "male") {
      switch (true) {
        case activityLevel === "sedentary":
          MaleSedentarySwitch(this.state.age);
          break;
        case activityLevel === "moderately active":
          MaleModActiveSwitch(this.state.age);
          break;
        case activityLevel === "active":
          MaleActiveSwitch(this.state.age);
          break;
        default:
          console.log("nope");
      }
    } else if (gender === "female") {
      switch (true) {
        case activityLevel === "sedentary":
          FemaleSedentarySwitch(this.state.age);
          break;
        case activityLevel === "moderately active":
          FemaleModActiveSwitch(this.state.age);
          break;
        case activityLevel === "active":
          FemaleActiveSwitch(this.state.age);
          break;
        default:
          console.log("nope");
      }
    }
    // try {
    //   await __CreateProfile(this.state);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  render() {
    // console.log(this.state.currentUser);
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
        <h3>Profile</h3>
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
            <TextInput
              placeholder="Rec cal intake"
              name="recCalIntake"
              type="number"
              value={recCalIntake}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
