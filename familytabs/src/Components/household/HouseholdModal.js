import React, { Component } from "react";
import Switch from "react-switch";
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
    .switchbox {
      margin: 8px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
`;

export default class HouseholdModal extends Component {

  componentDidMount() {
    if (this.props.edit) {
      this.props.handleNotificationChange(this.props.notification);
    }
  }

  render() {
    return (
      <StyledFormWrapper>
        <form onSubmit={this.props.addOrEdit}>
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

          <div className="switchbox">
            <label>Admin</label>
            <Switch
              onChange={this.props.handleAdminChange}
              checked={!!this.props.isAdmin}
              className="react-switch"
              id="normal-switch"
            />
          </div>
          <div className="switchbox">
            <label>Notifications</label>
            <Switch
              onChange={this.props.handleNotificationChange}
              checked={!!this.props.notification}
              className="react-switch"
              id="normal-switch"
            />
          </div>

          <button>{this.props.edit ? "Edit" : "Add"} Household Member</button>
        </form>
        <button onClick={this.props.toggleForm}>Exit</button>
      </StyledFormWrapper>
    );
  }
}
