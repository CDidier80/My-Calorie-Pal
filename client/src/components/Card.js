import React, { Component } from "react";

import MealCard from "./MealCard";

import { __GetMeal } from "../services/MealServices";
import { __GetFood } from "../services/FoodServices";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      meal: [],
      food: [],
    };
  }

  getMeal = async (mealId) => {
    try {
      const mealData = await __GetMeal(mealId);
      this.setState({
        meal: mealData.meal,
      });
      this.state.meal.foods.forEach((element) => {
        this.getFood(element);
      });
    } catch (error) {
      throw error;
    }
  };

  getFood = async (foodId) => {
    try {
      const foodData = await __GetFood(foodId);
      this.setState((prevState) => ({
        food: [...prevState.food, foodData.food],
      }));
      console.log(this.state.food);
    } catch (error) {
      throw error;
    }
  };

  handleClick = (event) => {
    // console.log(event);
    // this.getMeal(event);
    this.setState({ clicked: true });
  };

  render() {
    const { clicked, food } = this.state;

    return (
      <td>
        <div onClick={() => this.handleClick(this.props.value)}>
          {this.props.name}
        </div>
        <button
          className="mealCard-button"
          value={this.props.value}
          onClick={this.props.onClick}
          type="submit"
        >
          Remove
        </button>
      </td>
    );
  }
}

export default Card;
