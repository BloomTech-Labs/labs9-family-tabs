import React, { Component } from 'react'
import axios from 'axios';
import HouseholdFamily from './HouseholdFamily';

export default class Household extends Component {

  constructor() {
    super();
    this.state = { familydata: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/familymembers/1')
    .then(familydata => {
      console.log(familydata);
      this.setState({familydata: familydata.data});
      console.log(this.state); 
    })
    .catch(err => {
      console.log(err); 
    });
    
  
}



render() {
  return (
    <div>
      <div>
      <h1>I am the Household page</h1>
      </div>
    {this.state.familydata.map(familydata => (

          <HouseholdFamily familydata={familydata} />

        ))}   

    </div>
  )
}
}


