import React from "react";

const FemaleModActiveSwitch = (props) => {
  const age = parseInt(props);
  switch (true) {
    case age <= 18:
      console.log(2000);
      break;
    case age > 18 && age <= 30:
      console.log(2100);
      break;
    case age > 30 && age <= 50:
      console.log(2000);
      break;
    case age > 50:
      console.log(1800);
      break;
    default:
      console.log("whoops");
      break;
  }
};

export default FemaleModActiveSwitch;
