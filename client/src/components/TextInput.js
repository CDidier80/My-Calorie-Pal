import React from "react";

const TextInput = (props) => {
  return (
    <div>
      <div className="text-input">
        {props.title ? <div className="text-title">{props.title}:</div> : null}
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          autoComplete="false"
        />
      </div>
    </div>
  );
};

export default TextInput;
