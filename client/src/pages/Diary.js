import React, { Component } from "react";
import TextInput from "../components/TextInput";
import Card from "../components/Card";
import MealCard from "../components/MealCard";

import Table from "react-bootstrap/Table";

import { __GetDiary } from "../services/UserServices";
import { __RemoveMeal } from "../services/MealServices";

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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getDiary();
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.removeMeal(e.target.value);
  };

  render() {
    const { date, meals, exercise, profile } = this.state;
    console.log(profile.recCalIntake);
    return (
      <div>
        <h3>{this.props.currentUser.name}'s Diary</h3>
        <form className="center" onSubmit={this.handleSubmit}>
          <TextInput
            placeholder="YYYY-DD-MM"
            name="date"
            type="text"
            value={date}
            onChange={this.handleChange}
          />
        </form>
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
