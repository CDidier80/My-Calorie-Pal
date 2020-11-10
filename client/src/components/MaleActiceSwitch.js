import React from "react";

const MaleActiveSwitch = (props) => {
  const age = parseInt(props);
  switch (true) {
    case age <= 18:
      console.log(3000);
      break;
    case age > 18 && age <= 30:
      console.log(3000);
      break;
    case age > 30 && age <= 50:
      console.log(2900);
      break;
    case age > 50:
      console.log(2600);
      break;
    default:
      console.log("whoops");
      break;
  }
};

export default MaleActiveSwitch;
