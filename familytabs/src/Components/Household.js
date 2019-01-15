import React, { Component } from 'react'
import axios from 'axios';

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
        <h1>I am the Household page</h1>
        <p>{this.state.familydata}</p>
      </div>
    )
  }
}


