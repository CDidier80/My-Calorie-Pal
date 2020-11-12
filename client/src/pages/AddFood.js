import React, { Component } from "react";
import TextInput from "../components/TextInput";
import MealCard from "../components/MealCard";

import {
  __CreateFood,
  __GetFood,
  __RemoveFood,
} from "../services/FoodServices";
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
      meal: "",
      foods: [],
      totalCals: 0,
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
      });
      let i = mealData.meal.foods.length - 1;
      this.getFood(mealData.meal.foods[i]);
    } catch (error) {
      throw error;
    }
  };

  getFood = async (food) => {
    try {
      const foodData = await __GetFood(food);
      this.setState((prevState) => ({
        foods: [...prevState.foods, foodData.food],
        // totalCals: (prevState.totalCals += foodData.food.calories),
      }));
    } catch (error) {
      throw error;
    }
  };

  removeFood = async (foodId) => {
    try {
      await __RemoveFood(this.props.meal_id, foodId);
      this.setState((prevState) => ({
        foods: prevState.foods.filter((food) => food._id !== foodId),
      }));
    } catch (error) {
      throw error;
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.removeFood(e.target.value);
    setTimeout(() => this.getTotalCals(), 50);
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
    setTimeout(() => this.getTotalCals(), 50);
  };

  getTotalCals = () => {
    let totalCals = 0;
    this.setState({ totalCals: 0 });
    this.state.foods.forEach((element) => {
      totalCals += element.calories;
      this.setState({ totalCals: totalCals });
    });
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
              <h3 className="underline">{meal}</h3>

              <div className="mealCard-wrapper">
                {this.state.foods.map((element) => (
                  <MealCard
                    key={element._id}
                    value={element._id}
                    name={element.description}
                    calories={element.calories}
                    onClick={this.handleClick}
                  />
                ))}
                <div className="total-cals">
                  Total Cals = {this.state.totalCals}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFood;
