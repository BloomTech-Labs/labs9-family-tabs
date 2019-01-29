import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";
import { Button, Colors} from "@blueprintjs/core";


const MainElements = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 100%;
  color: #ffffff;
  font-family:'Roboto', sans-serif;
  margin: 250px 250px 400px 250px;
`;

const LeftLanding = styled.div`
  display: flex; 
  flex-direction: column;
  width: 50%;
  margin: 15px;
`;

const Title = styled.h1`
  margin: 150px 0 0 0;
  display: flex;
  color: #ffffff;
  font-size: 60px;
  font-weight: 700;
`;

const BottomBorder = styled.div`
  border-bottom: 2px solid white;
  height: 50px;
  width: 100%;
`;

const RightLanding = styled.div`
  display: flex;
  width: 50%;
  margin: 15px;
`;

const CarouselDiv = styled.div`

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
        <MainElements>
              <LeftLanding>
                <Title>Family Tabs</Title>
                <BottomBorder></BottomBorder>
                <Link to="/signup">Sign Up for Family Tabs!</Link>
              </LeftLanding>

              <RightLanding>
                <CarouselDiv>
                   <InfoCarousel />
                </CarouselDiv>
               
                <Button 
                  style={{ color: Colors.WHITE, background: "#242943", border: Colors.WHITE }} 
                  fill={false} 
                  rightIcon="arrow-right" 
                  large={true} 
                  onClick={this.props.auth.login}
                  >Log in</Button>
              </RightLanding>
        </MainElements>
      )
    }
  }
  
  export default LandingPage;