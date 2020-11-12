import React, { Component } from "react";

import { __GetMeal } from "../services/MealServices";

// const Card = (props) => {
//   console.log(props);
//   return (
//     <td>
//       {props.name}{" "}
//       <button
//         className="mealCard-button"
//         value={props.value}
//         onClick={props.onClick}
//         type="submit"
//         onMouseEnter={props.onMouseEnter}
//       >
//         Remove
//       </button>
//     </td>
//   );
// };

class Card extends Component {
  constructor() {
    super();
    this.state = {
      meal: [],
    };
  }

  GetMeal = async () => {
    try {
      const mealData = await __GetMeal(this.props.meal_id);
      this.setState({
        meal: mealData.meal.description,
      });
      console.log(this.state.meal);
      // let i = mealData.meal.foods.length - 1;
      // this.getFood(mealData.meal.foods[i]);
    } catch (error) {
      throw error;
    }
  };

  handleMouseEnter = (event) => {
    console.log(event);
    // this.GetMeal(event);
  };

  render() {
    console.log(this.props);
    return (
      <td>
        <div onMouseEnter={() => this.handleMouseEnter(this.props.value)}>
          {this.props.name}
        </div>
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
