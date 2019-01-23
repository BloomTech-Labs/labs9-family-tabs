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
    return (
      <div>
        <h1>I am the Account Settings page</h1>
        <FormContainer>
        <form>
          <BasicInfo>
          <label>
          Email:
          <input type="text" name="name" />
          </label>
          <label>
          Phone:
          <input type="text" name="name" />
          </label>
          </BasicInfo>
          <NotificationOptions>
          <label>
          Emails?
          <input type="checkbox" name="name" />
          </label>
          <label>
          Texts?
          <input type="checkbox" name="name" />
          </label>
          </NotificationOptions>
          <PasswordChange>
          <label>
          Old Password
          <input type="password" name="name" />
          </label>
          <label>
          New Password
          <input type="password" name="name" />
          </label>
          </PasswordChange>
          <button>Save</button>
        </form>
       
        </FormContainer>
      </div>
    )
  }
}
