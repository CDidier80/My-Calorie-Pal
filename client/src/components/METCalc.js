import React from "react";

const METCalc = (...props) => {
  const { weight, activityLevel, duration } = props[0];
  const getCalsBurned = props[1];
  const kgs = weight * 0.45359237;

  let time = 0;
  let MET = 0;
  switch (true) {
    case activityLevel === "Light":
      MET = 3;
      break;
    case activityLevel === "Moderate":
      MET = 5;
      break;
    case activityLevel === "Vigorous":
      MET = 7;
      break;
    default:
      console.log("error");
  }

  switch (true) {
    case duration === "15 mins":
      time = 15;
      break;
    case duration === "30 mins":
      time = 30;
      break;
    case duration === "45 mins":
      time = 45;
      break;
    case duration === "1 hour":
      time = 60;
      break;
    case duration === "1.5 hours":
      time = 90;
      break;
    case duration === "2 hours":
      time = 120;
      break;
    default:
      console.log("error");
  }

  let calsBurned = (time * (MET * 3.5 * kgs)) / 200;
  getCalsBurned(Math.round(calsBurned));
};

export default METCalc;
