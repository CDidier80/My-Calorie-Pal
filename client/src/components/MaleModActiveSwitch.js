import React from "react";

const MaleModActiveSwitch = (props) => {
  let handleRecCal = props[1];
  const { age } = props[0];
  let ageCheck = parseInt(age);
  switch (true) {
    case ageCheck <= 18:
      handleRecCal(2600);
      break;
    case ageCheck > 18 && age <= 30:
      handleRecCal(2700);
      break;
    case ageCheck > 30 && age <= 50:
      handleRecCal(2500);
      break;
    case ageCheck > 50:
      handleRecCal(2300);
      break;
    default:
      console.log("error");
      break;
  }
};

export default MaleModActiveSwitch;
