import React, { Component } from 'react';
import CalendarComponent from './Calendar';


class ParentHome extends Component {
    render() {
      return (
        <div className="ParentHomepage">
            <h1>Parent Homepage</h1>
            <CalendarComponent />
        </div>
      );
    }
  }
  
  export default ParentHome;