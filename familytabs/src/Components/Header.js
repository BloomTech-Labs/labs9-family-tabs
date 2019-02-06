import React, { Component } from "react";
import NavBurger from './NavBurger';
import FTLogo8 from './images/FT_Logo_8.png'
import styled from "styled-components";
import PublicRoute from "../context/PublicRoute";
import PrivateRoute from "../context/PrivateRoute";
import LoginButton from './styled/LoginButton'

const LogoImage = styled.img`
  /* width: 200px;
  background-color: #242943;
  border: 2px solid red; 
  opacity: 1; */
`;

const Title = styled.h1 `
color: #ffffff;



`;

const SubTitle = styled.p `
color: #ffffff;



`;

const StyledTop = styled.div `
  /* display: flex;
  justify-content: flex-end;
  width: 98%;
  /* border: 2px solid red; */
  /* padding-top: 5px;
  margin-left: 10px; */ 

`;

const BurgerWrapper = styled.div`
  /* border: 2px solid red; */
  /* display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 7.5px; */
`;

const ImageWrapper = styled.div`
  /* border: 2px solid red; */
`;

const Content = styled.div`

`;


class Header extends Component {

    render() {
        return (
            <StyledTop>
            <ImageWrapper>
            <LogoImage src={FTLogo8} alt="FTLogo8">
            </LogoImage>
            </ImageWrapper>
            <Content>
            <SubTitle>{this.props.subTitle}subtitle</SubTitle>
            <Title>{this.props.title}Title</Title>
            </Content>
            <BurgerWrapper>
            <PublicRoute exact path='/' component={LoginButton}></PublicRoute>
            <PrivateRoute path="/home" component={NavBurger} />
            </BurgerWrapper>
            </StyledTop>
        )
  }
}

export default Header;