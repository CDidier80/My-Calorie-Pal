import React, { Component } from "react";
import { __GetProfile } from "../services/ProfileServices";

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      const profileData = await __GetProfile(this.props.currentUser._id);
      console.log(profileData.profile);
      this.setState(profileData.profile);
    } catch (error) {
      throw error;
    }
  };

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
