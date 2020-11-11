import React from "react";
import FemaleSedentarySwitch from "../components/FemaleSedentarySwitch";
import FemaleModActiveSwitch from "../components/FemaleModActiveSwitch";
import FemaleActiveSwitch from "../components/FemaleActiveSwitch";

const FemaleSwitch = (...props) => {
  const { activityLevel } = props[0];
  switch (true) {
    case activityLevel === "sedentary":
      FemaleSedentarySwitch(props);
      break;
    case activityLevel === "moderately active":
      FemaleModActiveSwitch(props);
      break;
    case activityLevel === "active":
      FemaleActiveSwitch(props);
      break;
    default:
      console.log("error");
  }
};

export default FemaleSwitch;
