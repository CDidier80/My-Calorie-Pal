import React from "react";

const TextInput = (props) => {
  return props.fieldType === "textfield" ? (
    <textarea
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
    />
  ) : (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      autoComplete="false"
    />
  );
};

export default TextInput;
