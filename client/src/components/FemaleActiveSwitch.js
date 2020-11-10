import React from "react";

const FemaleActiveSwitch = (props) => {
  const age = parseInt(props);
  switch (true) {
    case age <= 18:
      console.log(2400);
      break;
    case age > 18 && age <= 30:
      console.log(2400);
      break;
    case age > 30 && age <= 50:
      console.log(2200);
      break;
    case age > 50:
      console.log(2100);
      break;
    default:
      console.log("whoops");
      break;
  }
};

export default FemaleActiveSwitch;
