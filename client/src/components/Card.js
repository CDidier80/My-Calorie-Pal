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
        food: [],
      });
      this.state.meal
        ? this.state.meal.foods.forEach((element) => {
            this.getFood(element);
          })
        : this.setState({ clicked: false });
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
    } catch (error) {
      throw error;
    }
  };

  handleClick = (event) => {
    // console.log(event);
    this.getMeal(event);
    let clicked = this.state.clicked;
    this.setState({ clicked: clicked ? false : true });
  };

  render() {
    const { clicked, food } = this.state;
    const extraContent = food.map((element) => (
      <MealCard
        key={element._id}
        value={element._id}
        name={element.description}
        calories={element.calories}
      />
    ));
    return (
      <td>
        <a onClick={() => this.handleClick(this.props.value)}>
          {this.props.name}
        </a>
        {clicked && extraContent}
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
