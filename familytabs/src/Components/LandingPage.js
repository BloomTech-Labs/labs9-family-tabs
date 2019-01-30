import React, { Component } from 'react';
import InfoCarousel from './InfoCarousel';
import styled from "styled-components";
import { Button, Colors} from "@blueprintjs/core";


const MainContainer = styled.div`

  max-height: 100%;

`;

const MainElements = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 100%;
  color: #242943;
  font-family:'Roboto', sans-serif;
  margin: 150px 150px 150px 150px;

`;

const LeftLanding = styled.div`
  display: flex; 
  flex-direction: column;
  width: 35%;
  margin: 15px;
  color: #ffffff;

`;

const Title = styled.h1`
  margin: 0 0 0 0;
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 60px;
  padding:0;
  font-weight: 700;

`;

const BottomBorder = styled.div`
  border-bottom: 2px solid white;
  height: 20px;
  width: 100%;
 
`;

const RightLanding = styled.div`
  display: flex;
  width: 65%;
  margin: 15px;

`;

const CarouselDiv = styled.div`

`;

const ButtonContainer = styled.div`

display: flex;
justify-content: flex-end;
margin: 50px 20px 0px 0px;


`;

const StartContainer = styled.div`

display: flex;
justify-content: flex-end;
padding-right: 20px;



`;



const Content = styled.p `
    text-align: left;
    color: #ffffff;
    font-size: 18px;
    line-height: 1.5;
    padding: 20px 20px 20px 0;
    margin: 60px 0 20px 0;

`;

const TitleContent = styled.p `
   display: flex;
   justify-content: flex-end;
    color: #ffffff;
    font-size: 16px;
    margin: 30px 0px 10px 20px;
    padding-right: 15px;
   
    color: #3985ac;

  

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
          
        <Button 
            style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", padding: "15px 50px 15px 50px", width:"200px", height: "50px"}} 
            fill={false} 
            rightIcon="arrow-right" 
            large={true} 
            onClick={this.props.auth.login}
            >LOG IN</Button>
        </ButtonContainer>
        <MainElements>
            

              <LeftLanding>
                <TitleContent>keep tabs on the whole family with</TitleContent>
                <Title>Family Tabs.</Title>
                <BottomBorder></BottomBorder>
               
                  <Content>
                  SOME VERY LOUD TEXT IN CAPS DESCRIBING OUR SUPER COOL APP. REALLY DRAW THOSE PEOPLE IN, AND TAKE AAALLLL THEIR MONEY! THEN, WE ARE BUYING THE ISLAND. WE CAN GET SOME ISLAND CATS TOO. THAT SOUNDS SO GREAT!
                  </Content>

               
                <StartContainer>
                <Button 
                style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", padding: "10px 30px 10px 30px", width: "200px", height: "50px", }} 
                fill={false} 
                rightIcon="arrow-right" 
                large={true} 
                onClick={this.signUpLink}
              >GET STARTED!</Button>
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