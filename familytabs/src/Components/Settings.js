import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { text } from 'body-parser';

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
  constructor () {
    super();
    this.state = {
      userName: '',
      email: '',
      phone: '',
      firstTimeFlag: 0,
      id: null,
      textCheckbox: null,
      editResult: '',
    }
  }

inputHandler = (e) => {
  this.setState({ [e.target.name]: e.target.value, textCheckbox: e.target.checked});
}

onSaveHandler = async (e) => {
  e.preventDefault(); 
  const { userName, email, phone, id, textCheckbox} = this.state; 
  const reqBody = {
    userName: userName,
    email: email,
    phone: phone,
    textCheckbox: textCheckbox,
  }

  try {
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/profile/edit/${id}`, reqBody)
    console.log(res)
    this.setState({editResult: `Your changes have been saved to your profile!`})
    
  }
  catch (err) {
    console.error(err); 
  }
}


  render() {
    console.log("state", this.state);
    if (this.props.profile === null) {
      return (
        <div>Login Id not found. Cannot determine Admin status of user. Please try logging in again. If error persists, please contact support at familytabs@gmail.com.</div>
        );
    } else if (this.props.profile.isAdmin === 1) {
        if(this.state.userName === '' && this.state.firstTimeFlag === 0) {
          let textCheckbox;
          if(this.props.profile.textCheckbox === 1) {
           textCheckbox = true; 
          } else {
            textCheckbox = false;
          }

          this.setState({
            userName: this.props.profile.userName, 
            email: this.props.profile.email, 
            phone: this.props.profile.phone, 
            firstTimeFlag: 1, 
            id: this.props.profile.id,
            textCheckbox: textCheckbox,
          });
        }

        return (
          <div>
            <h1>Settings</h1>
            <FormContainer>
            <form onSubmit={this.onSaveHandler}>
            <BasicInfo>
                <label>
                  Name: 
                  <input 
                  type="text" 
                  name="userName" 
                  onChange={this.inputHandler}
                  value={this.state.userName} 
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
                  onChange={this.inputHandler}
                  value={this.state.phone} 
                  />
                </label>
              </BasicInfo>
              <NotificationOptions>
                <label>
                  Texts?
                  <input 
                  type="checkbox" 
                  name="textCheckbox" 
                  onChange={this.inputHandler}
                  checked={this.state.textCheckbox}
                  value={this.state.textCheckbox}
                  />
                </label>
              </NotificationOptions>
                <button>Save</button>
            </form>
            <div>{this.state.editResult}</div>
            </FormContainer>
          </div>
        )
    } else if(this.props.profile.isAdmin === 0) {
        if(this.state.name === '' && this.state.firstTimeFlag === 0) {
          this.setState({
            userName: this.props.profile.userName, 
            email: this.props.profile.email, 
            phone: this.props.profile.phone, 
            firstTimeFlag: 1, 
            id: this.props.profile.id
          });
        }

        return (
          <div>
            <h1>Settings</h1>
            <FormContainer>
            <form onSubmit={this.onSaveHandler}>
            <BasicInfo>
                <label>
                  Name: 
                  <input 
                  type="text" 
                  name="userName" 
                  onChange={this.inputHandler}
                  value={this.state.userName} 
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
                  onChange={this.inputHandler}
                  value={this.state.phone} 
                  />
                </label>
              </BasicInfo>
              <button>Save</button>
            </form>
            <div>{this.state.editResult}</div>
            </FormContainer>
          </div>
        )
      }
  }
}
