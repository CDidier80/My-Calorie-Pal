import React, { Component } from "react";

import MealCard from "./MealCard";
import ExerciseCard from "./ExerciseCard";

import { __GetMeal, __RecreateMeal } from "../services/MealServices";
import { __GetFood } from "../services/FoodServices";
import { __GetExercise } from "../services/ExerciseServices";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      meal: [],
      food: [],
      exercise: "",
    };
  }

  recreateMeal = async () => {
    try {
      await __RecreateMeal(this.state.meal, this.props.currentUser._id);
    } catch (error) {
      throw error;
    }
  };

  getExercise = async (exerciseId) => {
    this.setState({ exercise: [] });
    try {
      const exerciseData = await __GetExercise(exerciseId);
      this.setState({ exercise: exerciseData.exercise });
    } catch (error) {
      throw error;
    }
  };

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
        : this.setState({ meal: [] });
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
    this.getExercise(event);
    this.getMeal(event);
    this.setState({ clicked: !this.state.clicked });
  };

  handleRecreateMeal = (event) => {
    event.preventDefault();
    this.recreateMeal();
  };

  render() {
    const { clicked, food, exercise } = this.state;

    const foodContent = food.map((element) => (
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
        {clicked && foodContent}
        {clicked && exercise ? (
          <ExerciseCard
            calsBurned={exercise.calsBurned}
            activityLevel={exercise.activityLevel}
            duration={exercise.duration}
          />
        ) : null}
        {clicked && this.props.onClick ? (
          <button
            className="mealCard-button"
            value={this.props.value}
            onClick={this.props.onClick}
            type="submit"
          >
            Remove
          </button>
        ) : null}
        {clicked && !this.props.onClick ? (
          <button onClick={this.handleRecreateMeal}>Add Meal</button>
        ) : null}
      </td>
    );
  }
}

export default Card;
