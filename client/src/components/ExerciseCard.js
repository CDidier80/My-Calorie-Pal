import React from "react";

const ExerciseCard = (props) => {
  // console.log(props);
  return (
    <div>
      <div className="mealCard">
        Calories Burned: {props.calsBurned}
        <div>Intensity: {props.activityLevel}</div>
        <div>Duration: {props.duration}</div>
      </div>
    </div>
  );
};

export default ExerciseCard;
