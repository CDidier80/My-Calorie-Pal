import React, { Component } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Table from "react-bootstrap/Table";

import Card from "./Card";

import { __GetPreviousMeals } from "../services/MealServices";

class PreviousMeals extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      meals: [],
    };
  }

  componentDidMount() {
    // const today = new Date();
    // const yesterday = new Date(today);

    // yesterday.setDate(yesterday.getDate() - 1);

    // today.toDateString();
    // this.setState({ date: yesterday.toDateString() });
    // const today = new Date().toISOString().slice(0, 10);

    this.getPreviousMeals();
  }

  getPreviousMeals = async () => {
    try {
      const mealsData = await __GetPreviousMeals(
        this.props.currentUser._id,
        this.state.date
      );
      this.setState({ meals: mealsData.meals });
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
    this.getPreviousMeals();
    // setTimeout(() => this.getTotalCals(), 50);
    // setTimeout(() => this.getTotalCalsBurned(), 50);
  };

  render() {
    const { date, meals } = this.state;
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
        <div className="center block">
          <Table className="table table-striped table-bordered table-hover">
            {/* <thead>
              <tr>
                <td>Previous Meals</td>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                {meals
                  ? meals.map((element) => (
                      <Card
                        currentUser={this.props.currentUser}
                        key={element._id}
                        value={element._id}
                        name={element.name}
                        // onClick={this.handleClick}
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

export default PreviousMeals;
