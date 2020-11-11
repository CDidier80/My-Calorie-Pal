import React, { Component } from "react";
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
      this.setState({ mealCreated: true }, { meal_id: mealData._id });
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
    // console.log(this.props.currentUser);
    return (
      <div>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            {mealCreated ? (
              <div>
                <h3>{description}</h3>
                <TextInput
                  placeholder="Search food"
                  name="food"
                  type="text"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
            ) : (
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
            )}
            <button className="profile-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddMeal;
