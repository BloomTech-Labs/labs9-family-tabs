import React, { Component } from 'react';
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";
import { Button, Colors} from "@blueprintjs/core";
import FT_Logo_3 from './images/FT_Logo_3.jpg';


const MainContainer = styled.div`

  max-height: 100%;

`;

const MainElements = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 100%;
  color: #ffffff;
  font-family:'Roboto', sans-serif;
  margin: 150px 150px 150px 150px;
  border: 2px solid red;
`;

const LeftLanding = styled.div`
  display: flex; 
  flex-direction: column;
  width: 35%;
  margin: 15px;
  border: 2px solid orange;
`;

const Title = styled.h1`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 60px;
  padding:0;
  font-weight: 700;
  /* border: 2px solid green; */
`;

const BottomBorder = styled.div`
  border-bottom: 2px solid white;
  height: 20px;
  width: 100%;
  /* border: 2px solid yellow; */
`;

// const LandingText = styled.div`

//     display: flex;
//     flex-direction: column;
//     align-items: flex-start; 
//     padding-bottom: 10px;
//     border: 2px solid brown;
// `;


// const Card = styled.div`
//     border: 2px solid yellow;
 
//     display: flex;
//     flex-direction: row;
//     /* align-items: flex-start;   */
//     line-height: 2;
//     font-family: 'Roboto', sans-serif;
//     /* margin: 28px; */
// `;
const RightLanding = styled.div`
  display: flex;
  width: 65%;
  margin: 15px;
  border: 2px solid lightblue;
`;

const CarouselDiv = styled.div`

`;

const ButtonContainer = styled.div`
border: 2px solid lightcoral;
display: flex;
justify-content: flex-end;
margin-right: 20px;
margin-top: 20px;


`;

const StartContainer = styled.div`
border: 2px solid lightcoral;
display: flex;
justify-content: center;
`;

const ImageStyling = styled.img`
    opacity: 0.5;
    width: 25%;
    height: 10%;
    border-radius: 10px;;
    margin-top: 10px;
`;

class LandingPage extends Component { 
  componentDidMount(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('scopes')
  }

  signUpLink = () => {
    this.props.history.push('/signup');
  }

    render() {
      return (
        <MainContainer>
        <ButtonContainer>
        {/* <ImageStyling src={FT_Logo_3} alt="FT Logo"/> */}
        <Button 
            style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", padding: "15px 50px 15px 50px", width:"200px", height: "50px"}} 
            fill={false} 
            rightIcon="arrow-right" 
            large={true} 
            onClick={this.props.auth.login}
            >Log in</Button>
        </ButtonContainer>
        <MainElements>
            

              <LeftLanding>
                <Title>Family Tabs</Title>
                <BottomBorder></BottomBorder>
                <StartContainer>
                <Button 
                style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", padding: "10px 30px 10px 30px", width: "200px", height: "50px"}} 
                fill={false} 
                rightIcon="arrow-right" 
                large={true} 
                onClick={this.signUpLink}
              >Get Started!</Button>
              </StartContainer>
              </LeftLanding>

              <RightLanding>
                <CarouselDiv>
                   <InfoCarousel />
                </CarouselDiv>
               
                
              </RightLanding>
  
        </MainElements>
        </MainContainer>
      )
    }
  }
  
  export default LandingPage;