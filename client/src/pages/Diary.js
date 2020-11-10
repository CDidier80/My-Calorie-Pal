// import { compareSync } from "bcrypt";
import React, { Component } from "react";
import { __GetDiary } from "../services/UserServices";

class Diary extends Component {
  constructor() {
    super();
    this.state = {
      diaryFetchError: false,
      // data: [],
    };
  }

  componentDidMount() {
    this.getDiary();
  }

  getDiary = async () => {
    try {
      const diaryData = await __GetDiary(this.props.currentUser._id);
      console.log(diaryData);
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <h1>Diary</h1>
      </div>
    );
  }
}

export default Diary;
