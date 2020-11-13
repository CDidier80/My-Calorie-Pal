import React, { Component } from "react";
import TextInput from "../components/TextInput";
import MealCard from "../components/MealCard";

import {
  __CreateFood,
  __GetFood,
  __RemoveFood,
} from "../services/FoodServices";
import { __GetMeal, __UpDateMeal } from "../services/MealServices";

class AddFood extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      foods: [],
      name: "",
      date: new Date().toISOString().slice(0, 10),
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };
  }

  componentDidMount() {
    this.getMeal();
  }

  getMeal = async () => {
    try {
      const mealData = await __GetMeal(this.props.location.state.meal_id);
      this.setState({
        name: mealData.meal.name,
      });
      let i = mealData.meal.foods.length - 1;
      this.getFood(mealData.meal.foods[i]);
    } catch (error) {
      throw error;
    }
  };

  upDateMeal = async () => {
    try {
      const mealData = await __UpDateMeal(
        this.state,
        this.props.location.state.meal_id
      );
    } catch (error) {
      throw error;
    }
  };

  getFood = async (food) => {
    try {
      const foodData = await __GetFood(food);
      this.setState((prevState) => ({
        foods: [...prevState.foods, foodData.food],
      }));
    } catch (error) {
      throw error;
    }
  };

  removeFood = async (foodId) => {
    try {
      await __RemoveFood(this.props.location.state.meal_id, foodId);
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
      await __CreateFood(this.state, this.props.location.state.meal_id);
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
    setTimeout(() => this.upDateMeal(), 100);
  };

  getTotalCals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    this.setState({
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    });
    this.state.foods.forEach((element) => {
      totalCalories += element.calories;
      totalProtein += element.protein;
      totalCarbs += element.carbs;
      totalFat += element.fat;
      this.setState({
        totalCalories: totalCalories,
        totalProtein: totalProtein,
        totalCarbs: totalCarbs,
        totalFat: totalFat,
      });
    });
  };

  render() {
    const { description, calories, protein, carbs, fat, name } = this.state;
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
              <h3 className="underline">{name}</h3>

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
                  Total Cals = {this.state.totalCalories}
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
