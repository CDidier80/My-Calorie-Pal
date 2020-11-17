import Axios from "axios";
import React, { Component } from "react";
import TextInput from "../components/TextInput";
import AddFood from "./AddFood";

import Table from "react-bootstrap/Table";

import {
  __CreateFood,
  __GetFood,
  __RemoveFood,
} from "../services/FoodServices";
import { __GetMeal, __UpDateMeal } from "../services/MealServices";

const APP_ID = process.env.REACT_APP_ID;
const APP_KEY = process.env.REACT_APP_KEY;

class AddSearchFoods extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      tag_id: "",
      description: "",
      servingSize: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      name: "",
      foods: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      render: false,
      servings: 1,
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

  createFood = async () => {
    this.handleServings();
    try {
      await __CreateFood(this.state, this.props.meal_id);
      this.setState({
        description: "",
        servingSize: "",
        servings: 1,
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

  searchFood = async () => {
    const INSTANT_URL = `https://trackapi.nutritionix.com/v2/search/instant?query=${this.state.description}`;

    try {
      let res = await Axios.get(INSTANT_URL, {
        headers: {
          "x-app-id": `${APP_ID}`,
          "x-app-key": `${APP_KEY}`,
        },
      });
      this.setState({ tag_id: res.data.branded[0].nix_item_id });
      setTimeout(() => this.searchTag(), 10);
    } catch (error) {
      console.log(error);
    }
  };

  searchTag = async () => {
    const ITEM_URL = `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${this.state.tag_id}`;
    try {
      let res = await Axios.get(ITEM_URL, {
        headers: {
          "x-app-id": `${APP_ID}`,
          "x-app-key": `${APP_KEY}`,
        },
      });
      let data = res.data.foods[0];
      this.setState({
        calories: data.nf_calories,
        servingSize: data.serving_weight_grams,
        protein: data.nf_protein,
        carbs: data.nf_total_carbohydrate,
        fat: data.nf_total_fat,
      });
      if (this.state.tag_id) {
        this.createFood();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.description) {
      this.searchFood();
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.removeFood(e.target.value);
    setTimeout(() => this.getTotalCals(), 50);
  };

  handleServings = () => {
    let servings = this.state.servings;
    this.setState({
      calories: this.state.calories * servings,
      protein: this.state.protein * servings,
      carbs: this.state.carbs * servings,
      fat: this.state.fat * servings,
    });
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

  handleRenderChange = (e) => {
    e.preventDefault();
    this.setState({ render: !this.state.render });
    this.getMeal();
  };

  render() {
    const { description, name, servings } = this.state;

    return (
      <div>
        <button onClick={this.handleRenderChange}>
          {this.state.render ? (
            <div>Search Foods</div>
          ) : (
            <div>Add nutritional info manually</div>
          )}
        </button>
        {this.state.render ? (
          <AddFood meal_id={this.props.meal_id} />
        ) : (
          <div>
            <div className="center profile stack">
              <form onSubmit={this.handleSubmit}>
                <TextInput
                  placeholder="Search Food"
                  name="description"
                  type="text"
                  value={description}
                  onChange={this.handleChange}
                />
                <TextInput
                  title="Servings"
                  placeholder="1"
                  name="servings"
                  type="number"
                  value={servings}
                  onChange={this.handleChange}
                />
                <button className="profile-button" type="submit">
                  Search
                </button>
              </form>
            </div>
            <div className="center block">
              <Table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>{name}</th>
                    <th>Food Item</th>
                    <th>Serving Size(g)</th>
                    <th>Servings</th>
                    <th>Calories</th>
                    <th>Protein(g)</th>
                    <th>Carbs(g)</th>
                    <th>Fat(g)</th>
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
                      <td>{element.servingSize}</td>
                      <td>{element.servings}</td>
                      <td>{element.calories} </td>
                      <td>{element.protein}</td>
                      <td>{element.carbs}</td>
                      <td>{element.fat}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Totals</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{this.state.totalCalories}</td>
                    <td>{this.state.totalProtein}</td>
                    <td>{this.state.totalCarbs}</td>
                    <td>{this.state.totalFat}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddSearchFoods;
