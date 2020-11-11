import React, { Component } from "react";
import AddFood from "./AddFood";
import TextInput from "../components/TextInput";

import { __CreateMeal } from "../services/MealServices";

class AddMeal extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toLocaleDateString(),
      mealCreated: false,
      description: "",
      meal_id: "",
    };
  }

  componentDidMount() {}

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  createMeal = async () => {
    try {
      const mealData = await __CreateMeal(
        this.state,
        this.props.currentUser._id
      );
      this.setState({ mealCreated: true, meal_id: mealData._id });
    } catch (error) {
      throw error;
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.createMeal();
  };

  render() {
    const { mealCreated, description } = this.state;

    return (
      <div>
        <div className="profile">
          {mealCreated ? (
            <div>
              <AddFood meal_id={this.state.meal_id} />
            </div>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div>
                <h3>Create a Meal</h3>
                <TextInput
                  placeholder="Create a Meal"
                  name="description"
                  type="text"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              <button className="profile-button" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default AddMeal;
