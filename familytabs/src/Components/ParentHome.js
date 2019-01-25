import React, { Component } from 'react';
import CalendarComponent from './Calendar';
import styled from "styled-components";
const Buttons = styled.button`
    border: 4px solid orange;
    background-color: skyblue;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 300;
    border: 1px solid #86AEB1;
    width: 100%;
    height: 30px;
    padding-left: 15px;
    border-radius: 0.1rem;
    text-decoration: none;
    font-size: 12px;
`;



class ParentHome extends Component {
    render() {
      return (
        <div className="ParentHomepage">
            <h1>Parent Homepage</h1>
            <CalendarComponent {...this.props}/>
            <Buttons onClick={this.props.auth.logout}>Log out</Buttons>
        </div>
      );
    }
  }
  
  export default ParentHome;