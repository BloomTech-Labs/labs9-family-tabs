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
    console.log("THIS IS PROPS", this.props);
    
    if(this.props.profile === null) {

    } else {
        let id = this.props.profile.profile.familyID;
        axios.get(`${process.env.REACT_APP_API_URL}/familymembers/${id}`)
        .then(familydata => {
          this.setState({familydata: familydata.data});
          console.log("ID",id)
        })
        .catch(err => {
          console.log('running')
          console.log(err); 
        });
      }
    

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
