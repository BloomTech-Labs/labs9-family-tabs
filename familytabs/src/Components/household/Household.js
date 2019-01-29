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
      isAdmin: 0,
      showForm: false,
    };
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  memberAdder = async e => {
    e.preventDefault();
    const { userName, phone, email, isAdmin } = this.state;
    console.log("FAMILY ID", this.props.profile.familyID);

    const reqBody = {
      userName: userName,
      phone: phone,
      email: email,
      isAdmin: isAdmin,
      familyID: this.props.profile.familyID,
      textCheckbox: 0
    };

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/create`,
        reqBody
      );
      console.log(res);
      this.setState({
        editResult: `Your changes have been saved to your profile!`
      });
    } catch (err) {
      console.error("Axios is calling but getting error");
    }
  };

  render() {
    console.log("state", this.state);

    if (this.props.profile === null) {
      return (
        <div>
          Loading...
        </div>
      );
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
            {this.props.profile.isAdmin ? <button onClick={this.toggleForm}>+</button>:''}
              {this.state.showForm ? <HouseholdModal toggleForm={this.toggleForm}></HouseholdModal>: ''}
        </div>
      );
    }
  }

