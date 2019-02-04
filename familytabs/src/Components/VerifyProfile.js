import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { StyledFamilyForm } from "./styled/components";
import styled from 'styled-components'

const IntroWrapper = styled.div`
  display:flex;
  .intro{
    width:40%;
    margin:30px;
    color:white;
    
    h3{
      font-size:35px;
      margin-bottom:10px;
    }
    p{
      margin-left:10px;
      line-height:1.75;
    font-size:18px;
    }
  }
`

class VerifyProfile extends Component {
  state = {
    error: "",
    userEmail: "",
    userName: "",
    family_name: "",
    phone: "",
    loaded: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  familySubmitHandle = async e => {
    e.preventDefault();
    let userResponse;
    if (!this.state.family_name) {
      return;
    }
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/family/create`,
        {
          family_name: this.state.family_name
        }
      );
      let familyID = response.data[0].id;
      userResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/newlogin`,
        {
          userName: this.state.userName,
          email: this.state.userEmail,
          familyID,
          isAdmin: 1,
          phone: this.state.phone
        }
      );
      console.log(familyID);
      this.props.loadState(familyID);
      this.props.setProfile(userResponse.data);
      return;
    } catch (err) {
      console.log(userResponse.data);
    }
  };

  componentDidMount() {
    this.loadAPIProfile();
  }

  loadAPIProfile() {
    this.props.auth.getProfile(async (profile, error) => {
      let { email = profile.email.toLowerCase() } = profile;
      this.setState({ userEmail: email});
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/${this.state.userEmail}`
        );
        this.setState({ loaded: true });
        if (response.data.err) {
          return;
        }
        this.props.loadState(response.data.familyID);
        this.props.setProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    });
  }

  render() {
    const { loaded } = this.state;
    console.log(this.state)
    return (
      <>
        {!loaded ? (
          <h2>Loading...</h2>
        ) : (
          <>
            {this.props.profile ? (
              <Redirect to="/home/tabs" />
            ) : (
              <IntroWrapper>
                <div className='intro'>
                <h3>Welcome to Family Tabs</h3>
                <p>If you would like to register a new family, fill out the form. If you wanted to join an existing family, please log out and log in with the email address designated by your parent.</p>
                </div>
              
              <StyledFamilyForm onSubmit={this.familySubmitHandle}>
                <h2>Register Family</h2>
                <input
                  type="text"
                  name="family_name"
                  placeholder="family name"
                  value={this.state.family_name}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="userName"
                  placeholder="name"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <div className="button-box">
                  <button type="submit">Submit</button>
                  <button onClick={this.props.auth.logout}>Log out</button>
                </div>
              </StyledFamilyForm></IntroWrapper>
            )}
          </>
        )}
      </>
    );
  }
}

export default VerifyProfile;
