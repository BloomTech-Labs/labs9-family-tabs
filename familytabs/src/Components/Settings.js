import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';


const FormContainer = styled.div`
 border: 2px solid  yellow;
 display: flex;
 justify-content: center;
 width: 100%;
 height: 900px;

`;

const BasicInfo = styled.div`
  border: 2px solid red;
  color: #ffffff;
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NotificationOptions = styled.div`
 border: 1px solid blue;
 color: #3985ac;
`;



const Title = styled.h1`

  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 60px;

  font-weight: 500; 

`;

const LabelStylying = styled.label`
    background-color: #242943;
    display: flex;
    font-size: 25px;
    Margin: 0px 0px 20px 0px;




`;

const InputStyling = styled.input`
background-color: #242943;
border: 1px solid #3985ac;
color: #ffffff;
font-size: 18px;
width: 400px;
height: 40px;
padding-left: 20px;





`;

const AccountInfoTitle=styled.p `
        display: flex;
        justify-content: center;
        color: #ffffff;
`;

const FieldsStyling = styled.div `
display: flex;
flex-direction: column;
margin: 40px 0px 0px 20px;

`;

const NotificationBox = styled.input `

`;

const NotificationText = styled.input `


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
            <Title>Settings</Title>
            <AccountInfoTitle>Change Account Information</AccountInfoTitle>
            <FormContainer>
            <form onSubmit={this.onSaveHandler}>
            <BasicInfo>
                <FieldsStyling>
                <LabelStylying>
                  NAME 
                  
                </LabelStylying>
                <InputStyling 
                  type="text" 
                  name="userName" 
                  onChange={this.inputHandler}
                  value={this.state.userName} 
                  />
                  </FieldsStyling>
                  <FieldsStyling>
                <LabelStylying>
                  EMAIL
                  
                </LabelStylying>
                <InputStyling 
                  type="text" 
                  name="email" 
                  value={this.props.profile.email} 
                  />
                  </FieldsStyling>
                  <FieldsStyling>
                <LabelStylying>
                  PHONE 
                  
                </LabelStylying>
                <InputStyling 
                  type="text" 
                  name="phone"
                  onChange={this.inputHandler}
                  value={this.state.phone} 
                  />
                  </FieldsStyling>
              </BasicInfo>
              <NotificationOptions>
              <NotificationBox 
                  type="checkbox" 
                  name="textCheckbox" 
                  onChange={this.inputHandler}
                  checked={this.state.textCheckbox}
                  value={this.state.textCheckbox}
                  />
                <NotificationText>
                  TEXTS?
                </NotificationText>
               
              
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
