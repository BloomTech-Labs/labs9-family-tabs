import React, { Component } from 'react';
import Calendar from './Calendar'

class ParentHome extends Component {
    render() {
      return (
        <div className="ParentHomepage">
            <h1>Parent Homepage</h1>
            <Calendar />
        </div>
      );
    }
  }
  
  export default ParentHome;