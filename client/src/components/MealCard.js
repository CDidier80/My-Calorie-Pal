import React from "react";

import { __GetFood } from "../services/FoodServices";

const MealCard = ({ name }) => {
  //   console.log(props);
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
};

export default MealCard;
