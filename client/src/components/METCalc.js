import React from "react";

// MET*weight in kg=calories/hour
// Light = 3 MET
// Moderate = 5 MET
// Vigorous = 7 MET

const METCalc = (props) => {
  //   console.log(props);
  const { weight, activityLevel, duration } = props;
  //   const { weight, activityLevel, duration } = this.props;
  //   console.log(weight, activityLevel, duration);
  //   const kgs = weight * 0.45359237;
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
  console.log(MET);
  return (
    <div>
      <h1>Calc</h1>
    </div>
  );
};

export default METCalc;
