import React from "react";

const WeeklyGoalSwitch = (...props) => {
  let handleRecCal = props[1];
  let { weeklyGoal, recCalIntake } = props[0];
  switch (true) {
    case weeklyGoal === "Lose 2 lbs a week":
      handleRecCal(recCalIntake - 1000);
      break;
    case weeklyGoal === "Lose 1.5 lbs a week":
      handleRecCal(recCalIntake - 750);
      break;
    case weeklyGoal === "Lose 1 lb a week":
      handleRecCal(recCalIntake - 500);
      break;
    case weeklyGoal === "Lose .5 lb a week":
      handleRecCal(recCalIntake - 250);
      break;
    case weeklyGoal === "Maintain Current Weight":
      handleRecCal(recCalIntake);
      break;
    case weeklyGoal === "Gain .5 lb a week":
      handleRecCal(recCalIntake + 250);
      break;
    case weeklyGoal === "Gain 1 lb a week":
      handleRecCal(recCalIntake + 500);
      break;
    case weeklyGoal === "Gain 1.5 lbs a week":
      handleRecCal(recCalIntake + 750);
      break;
    case weeklyGoal === "Gain 2 lbs a week":
      handleRecCal(recCalIntake + 1000);
      break;

    default:
      console.log("error");
  }
};

export default WeeklyGoalSwitch;
