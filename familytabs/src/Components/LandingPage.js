import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 


class LandingPage extends Component {
    render() {
      return (
        <div className="LandingPage">
            <h1>Family Tabs Landing Page</h1>
            <button>BUY NOW!!!!</button>
            <Link to='/home/admin'>Log-In</Link>
        </div>
      );
    }
  }
  
  export default LandingPage;