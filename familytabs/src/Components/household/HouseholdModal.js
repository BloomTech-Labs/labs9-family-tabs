import React, { Component } from "react";
import Select from "react-select";
import styled from "styled-components";

const StyledFormWrapper = styled.div`
  height: 100vh;
  z-index: 3000;
  width: 100vw;
  background: #00000080;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    max-width: 600px;
    margin: 100px, auto;
    background: white;
    display: flex;
    flex-direction: column;
  }
`;

export default class HouseholdModal extends Component {
  state = {
    adminOptions: [
      {
        value: true,
        label:
          "Yes. Reminder, additional parent accounts only available with subscription"
      },
      { value: false, label: "No." }
    ]
  };
  render() {
    return (
      <StyledFormWrapper>
        <form onSubmit={this.props.memberAdder}>
          <input
            type="text"
            name="userName"
            placeholder="Name"
            onChange={this.props.inputHandler}
            value={this.props.userName}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
           onChange={this.props.inputHandler}
           value={this.props.phone}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.props.inputHandler}
            value={this.props.email}
          />

          <Select
            placeholder="Parent Account?"
            name="isAdmin"
            defaultValue={null}

            options={this.state.adminOptions}
            value={this.props.isAdmin}
            onChange={this.props.onInputChange}
          />

          <button>Add Household Member</button>
        </form>
        <button onClick={this.props.toggleForm}>Exit</button>
      </StyledFormWrapper>
    );
  }
}
