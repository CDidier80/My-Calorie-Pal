import React, { Component } from "react";
import TextInput from "../components/TextInput";

import { __CreateExercise } from "../services/ExerciseServices";

class AddExercise extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      description: "",
      calsBurned: 0,
    };
  }

  componentDidMount() {}

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
    this.createExercise();
  };

  render() {
    const { description, calsBurned } = this.state;
    return (
      <div>
        <h3>Add Exercise</h3>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <TextInput
              placeholder="Enter Exercise"
              name="description"
              type="text"
              value={description}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="Estimated Calories Burned"
              name="calsBurned"
              type="number"
              vale={calsBurned}
              onChange={this.handleChange}
            />
            <button className="profile-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddExercise;
