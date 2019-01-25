import React, { Component } from "react";
import HouseholdFamily from "./HouseholdFamily";
import styled from "styled-components";
import axios from "axios";

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Buttons = styled.button`
  border: 4px solid orange;
  background-color: skyblue;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 300;
  border: 1px solid #86aeb1;
  width: 100%;
  height: 60px;
  padding-left: 15px;
  border-radius: 0.1rem;
  text-decoration: none;
  font-size: 16px;
`;

export default class Household extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      phone: '',
      email: '',
      isAdmin: 0, 
    }
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  memberAdder = async (e) => {
    e.preventDefault(); 
    const { userName, phone, email, isAdmin, } = this.state; 
    console.log("FAMILY ID", this.props.profile.familyID)

    const reqBody = {
      userName: userName,
      phone: phone,
      email: email,
      isAdmin: isAdmin,
      familyID: this.props.profile.familyID, 
      textCheckbox: 0,
    }

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/create`, reqBody)
      console.log(res)
      this.setState({editResult: `Your changes have been saved to your profile!`})
      
    } catch (err) {
        console.error("Axios is calling but getting error"); 
    }
  }

  render() {
    console.log("state", this.state)

    if (this.props.profile === null) {
      return (
        <div>Login Id not found. Cannot determine Admin status of user. Please try logging in again. If error persists, please contact support at familytabs@gmail.com.</div>
        );
    } else if (this.props.profile.isAdmin === 1) {


    return (
      <div>

        <div>
          <h1>Household</h1>
        </div>

        <CardList>
          {this.props.family.map(familydata => (
            <HouseholdFamily key={familydata.id} familydata={familydata} />
          ))}
        </CardList>

        <div>
         <form onSubmit={this.memberAdder}>
            <label>Name:
             <input 
                 type="text"
                 name="userName" 
                 placeholder="Name"
                 onChange={this.inputHandler}
                 value={this.state.userName}></input>
            </label>

            <label>Phone:
             <input 
                 type="text"
                 name="phone" 
                 placeholder="Phone"
                 onChange={this.inputHandler}
                 value={this.state.phone}></input>
             </label>

            <label>Email:
             <input 
                 type="text"
                 name="email" 
                 placeholder="Email"
                 onChange={this.inputHandler}
                 value={this.state.email}></input>
            </label>

            <label>Is Admin? (1 for yes, 0 for no)
             <input 
                 type="text" 
                 name="isAdmin" 
                 onChange={this.inputHandler}
                 value={this.state.isAdmin}></input>
            </label>

             <button>Add Household Member</button>
         </form>
       </div>

        <Buttons onClick={this.props.auth.logout}>Log out</Buttons>
      </div>
    );
          } else if(this.props.profile.isAdmin === 0) {


            return (
              <div>
        
                <div>
                  <h1>Household</h1>
                </div>
        
                <CardList>
                  {this.props.family.map(familydata => (
                    <HouseholdFamily key={familydata.id} familydata={familydata} />
                  ))}
                </CardList>

                <Buttons onClick={this.props.auth.logout}>Log out</Buttons>
              </div>
            );

          }
  }
}
