import React from "react";

const MaleSedentarySwitch = (props) => {
  const age = parseInt(props);
  switch (true) {
    case age <= 18:
      console.log(2200);
      break;
    case age > 18 && age <= 30:
      console.log(2400);
      break;
    case age > 30 && age <= 50:
      console.log(2200);
      break;
    case age > 50:
      console.log(2000);
      break;
    default:
      console.log("whoops");
      break;
  }
};

export default MaleSedentarySwitch;
