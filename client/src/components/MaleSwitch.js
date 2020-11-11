import React from "react";
import MaleSedentarySwitch from "../components/MaleSedentarySwitch";
import MaleModActiveSwitch from "../components/MaleModActiveSwitch";
import MaleActiveSwitch from "../components/MaleActiceSwitch";

const MaleSwitch = (...props) => {
  const { activityLevel } = props[0];
  switch (true) {
    case activityLevel === "sedentary":
      MaleSedentarySwitch(props);
      break;
    case activityLevel === "moderately active":
      MaleModActiveSwitch(props);
      break;
    case activityLevel === "active":
      MaleActiveSwitch(props);
      break;
    default:
      console.log("error");
  }
};

export default MaleSwitch;
