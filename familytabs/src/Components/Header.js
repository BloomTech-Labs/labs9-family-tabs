import React, { Component } from "react";
import NavBurger from './NavBurger';
import FTLogo8 from './images/FT_Logo_8.png'
import styled from "styled-components";
import PublicRoute from "../context/PublicRoute";
import PrivateRoute from "../context/PrivateRoute";
import LoginButton from './styled/LoginButton'

const TopWrapper = styled.div`
  /* border: 2px solid white; */
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  margin: 15px 25px 0 25px;
`;

const ImageWrapper = styled.div`

`;

const BurgerWrapper = styled.div`
  /* border: 2px solid blue; */
  padding-top: 7.5px;
  font-size: 14px;
`;

const LogoImage = styled.img`
  width: 150px;
  background-color: #242943;
  opacity: 1;
`;

const Title = styled.div`
    font-size: 60px;
`;

const SubTitle = styled.div`
  /* border: 3px solid purple; */
  font-size: 14px;
  padding: 0 0 5px 50px; 
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #3985ac;
`;

const TitleHolder = styled.div`
  /* border: 5px solid orange; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0 0;
  margin: 10px 0 0 0;
`;

const TitleText = styled.div`
  /* border: 5px solid red; */
  width: 550px;
  display: flex;
  flex-direction: column;
`;

const BottomBorder = styled.div`
    border-bottom: 2px solid #D4B36E;
    width: 1400px;
    padding: 5px 0 0 0;
`;

class Header extends Component {
    render() {
        return (
         <TopWrapper>

          <ImageWrapper>
            <LogoImage src={FTLogo8} alt="FTLogo8"></LogoImage>
          </ImageWrapper>

          <TitleHolder>
            <TitleText>
              <SubTitle>{this.props.subTitle}</SubTitle>
              <Title>{this.props.title}</Title>
            </TitleText>

            <div>
              <BottomBorder></BottomBorder>
            </div>
          </TitleHolder>

          <BurgerWrapper>
            <PublicRoute exact path='/' component={LoginButton}></PublicRoute>
            <PrivateRoute path="/home" component={NavBurger} />
          </BurgerWrapper> 
        </TopWrapper> 
        )
  }
}

export default Header;