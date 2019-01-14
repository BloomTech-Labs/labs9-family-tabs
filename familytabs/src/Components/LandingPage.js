import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import Checkout from './Checkout';

class LandingPage extends Component {


  componentDidMount(){

}
  
    render() {
      return (
        <div>
          <div className="LandingPage">
              <h1>Family Tabs Landing Page</h1>
              <button>BUY NOW!!!!</button>
              <Link to='/home/tabs'>Log-In</Link>
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