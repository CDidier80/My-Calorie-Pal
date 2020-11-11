import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const DropDown = (props) => {
  return (
    <Dropdown
      className={props.className}
      placeholder={props.placeholder}
      onChange={props.onChange}
      options={props.options}
      value={props.value}
    ></Dropdown>
  );
};

export default DropDown;
