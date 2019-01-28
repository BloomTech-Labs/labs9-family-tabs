import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";
import { Button } from "@blueprintjs/core";



const  LandingPageTop = styled.div`
  border: 2px solid red; 
  max-width: 100%;
  max-height: 100%;
  opacity: 0.5;

`;

const  MainElements = styled.div`
 
  opacity: 100%;
  color: #ffffff;

`;

const StyledButton = styled(Button)`
    background: transparent;
`;



class LandingPage extends Component { 
  componentDidMount(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('scopes')
  }

    render() {
      return (
        <div>
          <LandingPageTop>
         
          </LandingPageTop>
          <MainElements>
              <h1>Family Tabs Landing Page</h1>
              <InfoCarousel />
              <Link to="/signup">Sign Up for Family Tabs!</Link>
              </MainElements>
              <StyledButton rightIcon="arrow-right" large={true} onClick={this.props.auth.login}>Log in</StyledButton>
        </div>
      )
    }
  }
  
  export default LandingPage;