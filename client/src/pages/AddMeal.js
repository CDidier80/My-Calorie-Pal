import React, { Component } from "react";
import PreviousMeals from "../components/PreviousMeals";

import AddSearchFoods from "./AddSearchFoods";
import TextInput from "../components/TextInput";

import { __CreateMeal } from "../services/MealServices";

class AddMeal extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      mealCreated: false,
      name: "",
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
    this.state.name ? this.createMeal() : this.setState({ mealCreated: false });
  };

  render() {
    const { mealCreated, name } = this.state;

    return (
      <div>
        {mealCreated ? (
          <div>
            <AddSearchFoods meal_id={this.state.meal_id} />
          </div>
        ) : (
          <div>
            <div className="profile">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextInput
                    placeholder="Create a Meal"
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
                <button className="profile-button" type="submit">
                  Submit
                </button>
              </form>
            </div>
            <PreviousMeals currentUser={this.props.currentUser} />
          </div>
        )}
      </div>
    );
  }
}

export default AddMeal;
