import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import Checkout from './Checkout';
import styled from "styled-components";

const  LandingPageTop = styled.div`
  border: 2px solid red; 
  max-width: 550px;
  display: flex; 
  align-items: center; 
  justify-content: center;
`;
  



class LandingPage extends Component { 
    render() {
      return (
        <div>
          <LandingPageTop>
              <h1>Family Tabs Landing Page</h1>
              <button>BUY NOW!!!!</button>
              <Link to='/home/tabs'>Log-In</Link>
          </LandingPageTop>
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