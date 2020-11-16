import React from "react";

const TextInput = (props) => {
  return (
    <div>
      <div className="text-input">
        <div className="title">{props.title ? `${props.title}:` : null}</div>
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
