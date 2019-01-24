import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";



const  LandingPageTop = styled.div`
  border: 2px solid red; 
  max-width: 100%;
  max-height: 100%;
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
              <h1>Family Tabs Landing Page</h1>
              <InfoCarousel />
              <Link to="/signup">Sign Up for Family Tabs!</Link>
              <button onClick={this.props.auth.login}>Log in</button>
          </LandingPageTop>
        </div>
      )
    }
  }
  
  export default LandingPage;