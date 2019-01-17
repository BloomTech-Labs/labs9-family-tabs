import React, { Component } from 'react'
import axios from 'axios';
import HouseholdFamily from './HouseholdFamily';



import styled from "styled-components";



const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;




export default class Household extends Component {

  constructor() {
    super();
    this.state = { familydata: [] };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/familymembers/1`)
    .then(familydata => {
      this.setState({familydata: familydata.data});
    })
    .catch(err => {
      console.log('running')
      console.log(err); 
    });
    
  
}



render() {
  return (
    <div>
      <div>
      <h1>I am the Household page</h1>
      </div>

    
<CardList>
    {this.state.familydata.map(familydata => (

          <HouseholdFamily key={familydata.id} familydata={familydata} />

          
        ))}   
</CardList>
    </div>
  )
}
}


