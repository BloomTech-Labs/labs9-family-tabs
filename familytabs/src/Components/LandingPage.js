import React, { Component } from 'react';
//import {Link} from 'react-router-dom'; 
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";



const  LandingPageTop = styled.div`
  border: 2px solid red; 
  max-width: 100%;
  max-height: 100%;
  /* display: flex; 
  align-items: center; 
  justify-content: center; */
`;


class LandingPage extends Component { 

    render() {
      
      return (
        <div>
          <LandingPageTop>
              <h1>Family Tabs Landing Page</h1>
              <InfoCarousel />
              <button onClick={this.props.auth.login}>Log in</button>
          </LandingPageTop>
        </div>
      )
    }
  }
  
  export default LandingPage;