import React, { Component } from 'react';
//import {Link} from 'react-router-dom'; 
import Checkout from './Checkout';

class LandingPage extends Component {


  
    render() {
      this.props.testFunc()
      return (
        <div>
          <div className="LandingPage">
              <h1>Family Tabs Landing Page</h1>
              <button>BUY NOW!!!!</button>
              {/* 
              uncomment to bypass login requirements
              
              <Link to='/home/tabs'>Enter</Link> */}
              <button onClick={this.props.auth.login}>Log in</button>
          </div>
          <div>
            <p className="App-intro">
            <Checkout
              name={'The Road to learn React'}
              description={'Only the Book'}
              amount={1}
            />
          </p>
          </div>
        </div>
      )
    }
  }
  
  export default LandingPage;