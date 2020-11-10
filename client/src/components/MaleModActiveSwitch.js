import React from "react";

const MaleModActiveSwitch = (props) => {
  const age = parseInt(props);
  switch (true) {
    case age <= 18:
      console.log(2600);
      break;
    case age > 18 && age <= 30:
      console.log(2700);
      break;
    case age > 30 && age <= 50:
      console.log(2500);
      break;
    case age > 50:
      console.log(2300);
      break;
    default:
      console.log("whoops");
      break;
  }
};

export default MaleModActiveSwitch;
