import React, { Component } from "react";
import { StyledFormWrapper } from "../styled/components";

export default class NotificationsModal extends Component {


  render() {
    return (
        <StyledFormWrapper>
            <h2>Are you sure you want to decline this event request?</h2>
            <button onClick={this.props.declineClick}>Decline Request</button>
            <button onClick={this.props.toggleForm}>Exit</button>
        </StyledFormWrapper>
    )
  }

}