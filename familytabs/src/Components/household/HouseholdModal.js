import React, { Component } from 'react'
import styled from 'styled-components'

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
  render() {
    return (
      <StyledFormWrapper>
          <form onSubmit={this.memberAdder}>
              <label>
                Name:
                <input
                  type="text"
                  name="userName"
                  placeholder="Name"
                //   onChange={this.inputHandler}
                //   value={this.state.userName}
                />
              </label>

              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                //   onChange={this.inputHandler}
                //   value={this.state.phone}
                />
              </label>

              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                //   onChange={this.inputHandler}
                //   value={this.state.email}
                />
              </label>

              <label>
                Is Admin? (1 for yes, 0 for no)
                <input
                  type="text"
                  name="isAdmin"
                //   onChange={this.inputHandler}
                //   value={this.state.isAdmin}
                />
              </label>

              <button>Add Household Member</button>
            </form>
        <button onClick={this.props.toggleForm}>Exit</button>
      </StyledFormWrapper>
    )
  }
}

