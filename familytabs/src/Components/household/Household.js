import React, { Component } from "react";
import HouseholdFamily from "./HouseholdFamily";
import styled from "styled-components";
import axios from "axios";
import HouseholdModal from "./HouseholdModal";

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default class Household extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      phone: "",
      email: "",
      notification: false,
      isAdmin: false,
      showForm: false
    };
  }

  handleAdminChange=(isAdmin) =>{
    this.setState({ isAdmin });
  }

  handleNotificationChange=(notification) =>{
    this.setState({ notification });
  }

  onInputChange = (inputValue, { action }) => {
    this.setState({ isAdmin: inputValue });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  memberAdder = async e => {
    e.preventDefault();
    const { userName, phone, email, isAdmin, notification } = this.state;
    const { familyID } = this.props;
    const newProfile = {
      userName,
      phone,
      email,
      isAdmin,
      familyID,
      textCheckbox: notification
    };

    try {
      console.log(newProfile);
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/create`,
        newProfile
      );
      console.log(res);
      this.props.loadState(familyID);
      this.setState({
        userName: "",
        phone: "",
        email: "",
        showForm: false,
        notification:false
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (!this.props.profile) {
      return <div>Loading...</div>;
    }
    return (
      <div>


        <CardList>
          {this.props.family.map(familydata => (
            <HouseholdFamily
              key={familydata.id}
              familydata={familydata}
              profile={this.props.profile}
              loadState={this.props.loadState}
            />
          ))}
        </CardList>
        {this.props.profile.isAdmin ? (
          <button onClick={this.toggleForm}>+</button>
        ) : (
          ""
        )}
        {this.state.showForm ? (
          <HouseholdModal
            toggleForm={this.toggleForm}
            inputHandler={this.inputHandler}
            onInputChange={this.onInputChange}
            {...this.state}
            addOrEdit={this.memberAdder}
            handleNotificationChange={this.handleNotificationChange}
            notification={this.state.notification}
            handleAdminChange={this.handleAdminChange}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
