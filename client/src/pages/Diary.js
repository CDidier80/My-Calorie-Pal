import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import React, { Component } from "react";
import { __GetDiary } from "../services/UserServices";
import { __RemoveMeal } from "../services/MealServices";

import Card from "../components/Card";
import MealCard from "../components/MealCard";

import Table from "react-bootstrap/Table";

class Diary extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      diaryFetchError: false,
      diaryData: {},
      meals: [],
      exercise: [],
      profile: [],
    };
  }

  componentDidMount() {
    this.setState({ date: new Date().toISOString().slice(0, 10) });
    setTimeout(() => this.getDiary(), 10);
  }

  getDiary = async () => {
    try {
      const diaryData = await __GetDiary(
        this.props.currentUser._id,
        this.state.date
      );
      this.setState({
        diaryData: diaryData,
        meals: diaryData.meals,
        exercise: diaryData.exercise,
        profile: diaryData.profile[0],
      });
    } catch (error) {
      console.log("error");
    }
  };

  removeMeal = async (mealId) => {
    try {
      await __RemoveMeal(mealId);
      this.setState((prevState) => ({
        meals: prevState.meals.filter((meal) => meal._id !== mealId),
      }));
    } catch (error) {
      throw error;
    }
  };

  handleChange = (event) => {
    let dateString = event;
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.setState({ date: `${year}-${month}-${day}` });
    this.getDiary();
  };

  handleClick = (e) => {
    e.preventDefault();
    this.removeMeal(e.target.value);
  };

  render() {
    const { date, meals, exercise, profile } = this.state;
    return (
      <div>
        <div className="center">
          <form>
            <Flatpickr
              placeholder={date}
              value={date}
              onChange={this.handleChange}
              options={{
                dateFormat: "Y-m-d",
                altFormat: "Y-m-d",
              }}
            />
          </form>
        </div>
        <h5>Recommended Cals: {profile.recCalIntake}</h5>
        <h5>Total Consumed Cals: </h5>
        <div className="center block">
          <Table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Diary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Meals</td>
                {meals
                  ? meals.map((element) => (
                      <Card
                        key={element._id}
                        value={element._id}
                        name={element.description}
                        onClick={this.handleClick}
                      />
                    ))
                  : null}
              </tr>
              <tr>
                <td>Exercise</td>
                {exercise
                  ? exercise.map((element) => (
                      <Card
                        key={element._id}
                        value={element._id}
                        name={element.description}
                        onClick={this.handleClick}
                      />
                    ))
                  : null}
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Diary;
