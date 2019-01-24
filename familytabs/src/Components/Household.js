import React, { Component } from 'react'
import HouseholdFamily from './HouseholdFamily';
import styled from "styled-components";


const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    </div>
  )
}
}
