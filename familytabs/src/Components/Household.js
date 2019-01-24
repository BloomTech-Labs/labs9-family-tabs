import React, { Component } from 'react'
import HouseholdFamily from './HouseholdFamily';
import styled from "styled-components";


const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

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
    height: 60px;
    padding-left: 15px;
    border-radius: 0.1rem;
    text-decoration: none;
    font-size: 16px;
`;


export default class Household extends Component {


render() {
  return (
    <div>
      <div>
      <h1>I am the Household page</h1>
      </div>

    
<CardList>
    {this.props.family.map(familydata => (

          <HouseholdFamily key={familydata.id} familydata={familydata} />

          
        ))}   
</CardList>
<Buttons onClick={this.props.auth.logout}>Log out</Buttons>
    </div>
  )
}
}
