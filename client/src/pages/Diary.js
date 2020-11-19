import React, { Component } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Table from "react-bootstrap/Table";
import { PieChart } from "react-minimal-pie-chart";

import { __GetDiary } from "../services/UserServices";
import { __RemoveMeal } from "../services/MealServices";
import { __DeleteExercise } from "../services/ExerciseServices";

import Card from "../components/Card";

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
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalCalsBurned: 0,
    };
  }

  componentDidMount() {
    this.setState({ date: new Date().toISOString().slice(0, 10) });
    setTimeout(() => this.getDiary(), 10);
    setTimeout(() => this.getTotalCals(), 500);
    setTimeout(() => this.getTotalCalsBurned(), 500);
  }

  getTotalCalsBurned = () => {
    let totalCalsBurned = 0;
    this.setState({ totalCalsBurned: 0 });
    this.state.exercise.forEach((element) => {
      totalCalsBurned += element.calsBurned;
      this.setState({ totalCalsBurned: totalCalsBurned });
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
    this.state.meals.forEach((element) => {
      if (element.totalCalories) {
        totalCalories += element.totalCalories;
        totalProtein += element.totalProtein;
        totalCarbs += element.totalCarbs;
        totalFat += element.totalFat;
        this.setState({
          totalCalories: totalCalories,
          totalProtein: totalProtein,
          totalCarbs: totalCarbs,
          totalFat: totalFat,
        });
      }
    });
  };

  getDiary = async () => {
    try {
      const diaryData = await __GetDiary(
        this.props.currentUser._id,
        this.state.date
      );
      this.setState({
        diaryData: diaryData,
        meals: diaryData.meals,
        exercise: diaryData.exercises,
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

  deleteExercise = async (exerciseId) => {
    try {
      await __DeleteExercise(exerciseId);
      this.setState((prevState) => ({
        exercise: prevState.exercise.filter(
          (exercise) => exercise._id !== exerciseId
        ),
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
    setTimeout(() => this.getTotalCals(), 500);
    setTimeout(() => this.getTotalCalsBurned(), 500);
  };

  handleClick = (e) => {
    e.preventDefault();
    this.removeMeal(e.target.value);
    this.deleteExercise(e.target.value);
    setTimeout(() => this.getTotalCals(), 50);
    setTimeout(() => this.getTotalCalsBurned(), 50);
  };

  render() {
    const {
      date,
      meals,
      exercise,
      profile,
      totalProtein,
      totalCarbs,
      totalFat,
      totalCalories,
      totalCalsBurned,
    } = this.state;
    let protein = Math.round((totalProtein / totalCalories) * 100 * 4) || 0;
    let carbs = Math.round((totalCarbs / totalCalories) * 100 * 4) || 0;
    let fat = Math.round((totalFat / totalCalories) * 100 * 9) || 0;
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
        <h5>
          Recommended Cals: {profile ? profile.recCalIntake : 0} - Consumed
          Cals: {totalCalories} = Calories Remaining:{" "}
          {profile ? profile.recCalIntake - totalCalories : 0}
        </h5>
        <h5>Total Cals Burned: {totalCalsBurned}</h5>
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
                        name={element.name}
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
        <div className="pie-chart">
          <div className="key">
            <h3>Macros</h3>
            <div className="protein"></div>
            <div> Protein: {protein}%</div>
            <div className="carbs"></div> <div>Carbs: {carbs}%</div>
            <div className="fat"></div>
            <div>Fat: {fat}%</div>
          </div>
          <PieChart
            data={[
              { title: "Protein", value: protein, color: "green" },
              { title: "Carbs", value: carbs, color: "blue" },
              { title: "Fat", value: fat, color: "red" },
            ]}
          />
        </div>
        ;
      </div>
    );
  }
}

export default Diary;
