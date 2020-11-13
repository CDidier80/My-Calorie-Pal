import Axios from "axios";
import React, { Component } from "react";
import TextInput from "../components/TextInput";
import MealCard from "../components/MealCard";
import AddFood from "./AddFood";

import {
  __CreateFood,
  __GetFood,
  __RemoveFood,
} from "../services/FoodServices";
import { __GetMeal, __UpDateMeal } from "../services/MealServices";
import { Link } from "react-router-dom";

const APP_ID = "93f97d03";
const APP_KEY = "d4fb8ea2d811ae360f008245276e8b60";

class AddSearchFoods extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      tag_id: "",
      description: "",
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
      searched: false,
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
      });
      let i = mealData.meal.foods.length - 1;
      this.getFood(mealData.meal.foods[i]);
    } catch (error) {
      throw error;
    }
  };

  upDateMeal = async () => {
    try {
      const mealData = await __UpDateMeal(this.state, this.props.meal_id);
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
        protein: data.nf_protein,
        carbs: data.nf_total_carbohydrate,
        fat: data.nf_total_fat,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.description
      ? this.searchFood() && this.setState({ searched: true })
      : this.setState({ searched: false });
  };

  handleAddFood = (e) => {
    e.preventDefault();
    this.state.tag_id
      ? setTimeout(() => this.createFood(), 20) &&
        setTimeout(() => this.getTotalCals(), 100) &&
        setTimeout(() => this.upDateMeal(), 100) &&
        this.setState({ searched: false })
      : this.setState({ searched: false });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.removeFood(e.target.value);
    setTimeout(() => this.getTotalCals(), 50);
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
    const {
      description,
      name,
      calories,
      protein,
      carbs,
      fat,
      searched,
    } = this.state;
    return (
      <div>
        <button>
          {
            <Link
              to={{
                pathname: "/food",
                state: {
                  meal_id: this.props.meal_id,
                },
              }}
            >
              Add nutritional info manually
            </Link>
          }
        </button>
        <div className="grid-food">
          <div className="center profile stack">
            <form onSubmit={this.handleSubmit}>
              <h3>Search food</h3>
              <TextInput
                placeholder="Search Food"
                name="description"
                type="text"
                value={description}
                onChange={this.handleChange}
              />
              <button className="profile-button" type="submit">
                Search
              </button>
              {searched ? (
                <div>
                  <h4>Calories: {calories}</h4>
                  <h4>Protein: {protein}</h4>
                  <h4>Carbs: {carbs}</h4>
                  <h4>Fat: {fat}</h4>
                  <button
                    className="profile-button"
                    type="submit"
                    onClick={this.handleAddFood}
                  >
                    Add Food
                  </button>
                </div>
              ) : null}
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
      </div>
    );
  }
}

export default AddSearchFoods;
