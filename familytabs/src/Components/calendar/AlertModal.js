import React, { Component } from "react";
import { StyledFormWrapper } from "../styled/components";

export default class AlertModal extends Component {
  render() {
    return (
        <StyledFormWrapper>
            <h2>Success!</h2>
            <button onClick={this.props.addEventHandler}>Exit</button>
        </StyledFormWrapper>
    )
  }

}

