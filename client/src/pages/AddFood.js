import React, { Component } from "react";
import TextInput from "../components/TextInput";
import MealCard from "../components/MealCard";

import { __CreateFood, __GetFood } from "../services/FoodServices";
import { __GetMeal } from "../services/MealServices";

class AddFood extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      foodAdded: false,
      meal: "",
      foods: [],
    };
  }

  componentDidMount() {
    this.getMeal();
  }

  getMeal = async () => {
    try {
      const mealData = await __GetMeal(this.props.meal_id);
      this.setState({
        meal: mealData.meal.description,
        foods: mealData.meal.foods,
      });
      this.getFood(mealData.meal.foods);
    } catch (error) {
      throw error;
    }
  };

  getFood = async (food) => {
    try {
      const foodData = await __GetFood(food);
      console.log(foodData);
    } catch (error) {
      throw error;
    }
  };

  createFood = async () => {
    try {
      await __CreateFood(this.state, this.props.meal_id);
      this.setState({
        foodAdded: true,
        description: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      this.getMeal();
    } catch (error) {
      throw error;
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.createFood();
  };

  render() {
    const { description, calories, protein, carbs, fat, meal } = this.state;
    return (
      <div className="grid-food">
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <h3>Add food</h3>
            <TextInput
              placeholder="Food Item"
              name="description"
              type="text"
              value={description}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="Calories"
              name="calories"
              type="text"
              value={calories}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="Protein"
              name="protein"
              type="text"
              value={protein}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="Carbs"
              name="carbs"
              type="text"
              value={carbs}
              onChange={this.handleChange}
            />
            <TextInput
              placeholder="Fat"
              name="fat"
              type="text"
              value={fat}
              onChange={this.handleChange}
            />
            <button className="profile-button" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div>
          <div className="profile">
            <form>
              <h3>{meal}</h3>
              {this.state.foodAdded ? (
                <div>
                  {/* {this.state.foods.map((element) => ( */}
                  {/* <MealCard key={element} name={element} /> */}
                  {/* ))} */}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFood;
