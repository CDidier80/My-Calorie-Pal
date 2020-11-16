import React, { Component } from "react";
import TextInput from "../components/TextInput";

import Table from "react-bootstrap/Table";

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
      const mealData = await __GetMeal(this.props.meal_id);
      this.setState({
        name: mealData.meal.name,
        foods: [],
      });
      mealData.meal.foods.forEach((element) => {
        this.getFood(element);
      });
      setTimeout(() => this.getTotalCals(), 100);
    } catch (error) {
      throw error;
    }
  };

  upDateMeal = async () => {
    try {
      const mealData = await __UpDateMeal(this.state, this.props.meal_id);
      this.setState({
        name: mealData.name,
        foods: [],
      });
      mealData.foods.forEach((element) => {
        this.getFood(element);
      });
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
      await __RemoveFood(this.props.meal_id, foodId);
      this.setState((prevState) => ({
        foods: prevState.foods.filter((food) => food._id !== foodId),
      }));
      this.upDateMeal();
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
      setTimeout(() => this.upDateMeal(), 50);
      setTimeout(() => this.getTotalCals(), 500);
    } catch (error) {
      throw error;
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.removeFood(e.target.value);
    setTimeout(() => this.getTotalCals(), 50);
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.description &&
      this.state.calories &&
      this.state.protein &&
      this.state.carbs &&
      this.state.fat
    ) {
      this.createFood();
    }
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
      <div>
        <div className="profile">
          <form onSubmit={this.handleSubmit}>
            <TextInput
              placeholder="Food Item"
              name="description"
              type="text"
              value={description}
              onChange={this.handleChange}
            />
            <div className="grid-food">
              <TextInput
                placeholder="Calories"
                name="calories"
                type="number"
                value={calories}
                onChange={this.handleChange}
              />
              <TextInput
                placeholder="Protein"
                name="protein"
                type="number"
                value={protein}
                onChange={this.handleChange}
              />
              <TextInput
                placeholder="Carbs"
                name="carbs"
                type="number"
                value={carbs}
                onChange={this.handleChange}
              />
              <TextInput
                placeholder="Fat"
                name="fat"
                type="number"
                value={fat}
                onChange={this.handleChange}
              />
            </div>
            <button className="profile-button" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="center block">
          <Table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>{name}</th>
                <th>Food Item</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {this.state.foods.map((element) => (
                <tr key={element._id}>
                  <td>
                    <button
                      className="mealCard-button"
                      value={element._id}
                      onClick={this.handleClick}
                      type="submit"
                    >
                      Remove
                    </button>
                  </td>
                  <td>{element.description}</td>
                  <td> {element.calories} </td>
                  <td>{element.protein}</td>
                  <td>{element.carbs}</td>
                  <td>{element.fat}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>Totals</td>
                <td>{this.state.totalCalories}</td>
                <td>{this.state.totalProtein}</td>
                <td>{this.state.totalCarbs}</td>
                <td>{this.state.totalFat}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AddFood;
