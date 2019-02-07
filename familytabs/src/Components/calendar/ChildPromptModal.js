import React, { Component } from "react";
import { StyledFormWrapper } from "../styled/components";


export default class ChildPromptModal extends Component {
    render() {
        return (
            <StyledFormWrapper>
                <h2>It looks like you have not finished setting up your family. Use the Household page to add children to your account!</h2>
                <button onClick={this.props.toggleFormChild}>Exit</button>
            </StyledFormWrapper>
        )
      }
}