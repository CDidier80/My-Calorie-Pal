import React from "react";

const MaleActiveSwitch = (props) => {
  let handleRecCal = props[1];
  const { age } = props[0];
  let ageCheck = parseInt(age);
  switch (true) {
    case ageCheck <= 18:
      handleRecCal(3000);
      break;
    case ageCheck > 18 && age <= 30:
      handleRecCal(3000);
      break;
    case ageCheck > 30 && age <= 50:
      handleRecCal(2900);
      break;
    case ageCheck > 50:
      handleRecCal(2600);
      break;
    default:
      console.log("whoops");
      break;
  }
};

export default MaleActiveSwitch;
