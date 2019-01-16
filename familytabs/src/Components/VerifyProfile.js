import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class VerifyProfile extends Component {
  state = {
    error: "",
    name: "",
    email: "",
    userEmail: "",
    userName: "",
    family_name: "",
    phone: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandle = e => {
    e.preventDefault();
    if (!this.state.name || !this.state.email) {
      return;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/profile`, {
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      family_id: this.state.profile.family_id
    });
    this.setState({ name: "", email: "" });
  };

  familySubmitHandle = async e => {
    e.preventDefault();
    let userResponse;
    if (!this.state.family_name) {
      return;
    }
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/family`,
        {
          family_name: this.state.family_name
        }
      );
      userResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          userName: this.state.userName,
          email: this.state.userEmail,
          familyID: response.data.id,
          isAdmin: 1,
          phone: this.state.phone
        }
      );
      this.setState({ profile: userResponse.data });
    } catch (err) {
      console.log(userResponse, "no bueno");
    }
  };

  componentDidMount() {
    this.loadAPIProfile();
  }

  loadAPIProfile() {
    this.props.auth.getProfile(async (profile, error) => {
      let { email = profile.email.toLowerCase(), name } = profile;
      this.setState({ userEmail: email, userName: name });
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/${this.state.userEmail}`
        );
        this.setState({ profile: response.data });
        this.props.setUserProfile(this.state.profile)
      } catch (err) {
        console.log(err);
      }
      
    });
  }

  render() {
    const { profile } = this.state;
    if (!profile) {
      
      return null
    };
    return (
      <>
        <h1>Profile</h1>
        <p>Name: {profile.name}</p>
        <p>Family: {profile.family_name}</p>
        <p>Email: {profile.email}</p>
        <p>
          ID: {profile.id} Family ID: {profile.familyID}
        </p>

        {this.props.profile ? (<Redirect to='/home'></Redirect>
        ) : (
          <form onSubmit={this.familySubmitHandle}>
            <h1>Register Family</h1>
            <label>family name</label>
            <input
              type="text"
              name="family_name"
              placeholder="family name"
              value={this.state.family_name}
              onChange={this.handleChange}
            />
            <label>name</label>
            <input
              type="text"
              name="userName"
              placeholder="name"
              value={this.state.userName}
              onChange={this.handleChange}
            />
            <label>phone</label>
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </>
    );
  }
}

export default VerifyProfile;
