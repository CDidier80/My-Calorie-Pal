import React, { Component } from "react";
// import { MDBD} from "mdbreact";
// let DateTimeField = require("react-bootstrap-datetimepicker");
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const Example = (props) => {
  console.log(props);
  const date = "11/11/2020";
  return (
    <div>
      DatePicker
      <DatePicker selected={date} />;
    </div>
  );
};

export default Example;
