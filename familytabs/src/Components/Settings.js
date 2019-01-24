import React, { Component } from 'react'
import styled from 'styled-components';

const FormContainer = styled.div`
 border: 1px solid  black;
 display: flex;

`;

const BasicInfo = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NotificationOptions = styled.div`
 border: 1px solid blue;
 display: flex;
 justify-content: space-evenly;
`;

const PasswordChange = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default class Settings extends Component {
  
  render() {
    if (this.props.profile === null) {
      return (
        <div>Login Id not found. Cannot determine Admin status of user. Please contact support at familytabs@gmail.com.</div>
        );
    } else if (this.props.profile.isAdmin === 1) {
        return (
          <div>
            <h1>I am the Account Settings page</h1>
            <FormContainer>
            <form>
              <BasicInfo>
                <label>
                  Name: 
                  <input 
                  type="text" 
                  name="name" 
                  value={this.props.profile.userName} 
                  />
                </label>
                <label>
                  Email: 
                  <input 
                  type="text" 
                  name="email" 
                  value={this.props.profile.email} 
                  />
                </label>
                <label>
                  Phone: 
                  <input 
                  type="text" 
                  name="phone" 
                  value={this.props.profile.phone} 
                  />
                </label>
              </BasicInfo>
              <NotificationOptions>
                <label>
                  Texts?
                  <input 
                  type="checkbox" 
                  name="name" 
                  />
                </label>
              </NotificationOptions>
                <button>Save</button>
            </form>
            </FormContainer>
          </div>
        )
    } else {
        return (
          <div>
            <h1>I am the Account Settings page</h1>
            <FormContainer>
            <form>
            <BasicInfo>
                <label>
                  Name: 
                  <input 
                  type="text" 
                  name="name" 
                  value={this.props.profile.userName} 
                  />
                </label>
                <label>
                  Email: 
                  <input 
                  type="text" 
                  name="email" 
                  value={this.props.profile.email} 
                  />
                </label>
                <label>
                  Phone: 
                  <input 
                  type="text" 
                  name="phone" 
                  value={this.props.profile.phone} 
                  />
                </label>
              </BasicInfo>
                <button>Save</button>
            </form>
            </FormContainer>
          </div>
        )
      }
  }
}
