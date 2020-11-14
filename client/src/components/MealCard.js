import React from "react";
import "../styles/Diary.css";

import { __GetFood } from "../services/FoodServices";

const MealCard = (props) => {
  return (
    <div>
      <div className="mealCard">
        {props.name}: {props.calories} cals
        {props.onClick ? (
          <button
            className="mealCard-button"
            value={props.value}
            onClick={props.onClick}
            type="submit"
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MealCard;
