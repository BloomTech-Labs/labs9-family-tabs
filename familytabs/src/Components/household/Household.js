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
      isAdmin: null,
      showForm: false
    };
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
    const { userName, phone, email, isAdmin } = this.state;
    console.log(isAdmin.value)
    const { familyID } = this.props;
    const newProfile = {
      userName,
      phone,
      email,
      isAdmin: isAdmin.value,
      familyID,
      //textCheckbox: 0
    };

    try {
      console.log(newProfile)
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
        isAdmin: null,
        showForm: false
      })
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (this.props.profile === null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <h1>Household</h1>
        </div>

        <CardList>
          {this.props.family.map(familydata => (
            <HouseholdFamily key={familydata.id} familydata={familydata} />
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
            memberAdder={this.memberAdder}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
