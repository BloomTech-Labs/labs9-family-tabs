import React, { Component } from "react";
import NavBurger from "./NavBurger";
import FTLogo8 from "./images/FT_Logo_8.png";
import styled from "styled-components";
import PublicRoute from "../context/PublicRoute";
import PrivateRoute from "../context/PrivateRoute";
import LoginButton from "./styled/LoginButton";

const TopWrapper = styled.div`
  /* border: 2px solid white; */
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  margin: 15px 25px 0 25px;
  max-width: 100%;


  @media (max-width: 768px) {
    display: flex;
    align-items:center;
    flex-direction: column-reverse;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  h5 {
    position: absolute;
    left: 65px;
    bottom: -15px;
    font-size: 18px;
    @media (max-width:768px){
      bottom: 10px;
      left:90px;
    }
  }
`;

const BurgerWrapper = styled.div`
  /* border: 2px solid blue; */
  padding-top: 7.5px;
  font-size: 14px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 150px;
  background-color: #242943;
  opacity: 1;

  @media (min-width: 1281px) and (max-width: 1450px) {
  }

  @media (min-width: 1024px) and (max-width: 1281px) {
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin: 25px;
  }
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
  border-bottom: 2px solid #d4b36e;
  width: 1200px;
  padding: 5px 0 0 0;

  @media (min-width: 1281px) and (max-width: 1450px) {
    width: 1000px;
  }

  @media (min-width: 1024px) and (max-width: 1281px) {
    width: 800px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 600px;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    width: 400px;
  }
`;

class Header extends Component {
  render() {
    return (
      <TopWrapper>
        <ImageWrapper>
          <LogoImage src={FTLogo8} alt="FTLogo8" />
          {this.props.isSubscribed ?  <h5>Premium</h5>: ""}
        </ImageWrapper>

        <TitleHolder>
          <TitleText>
            <SubTitle>{this.props.subTitle}</SubTitle>
            <Title>{this.props.title}</Title>
          </TitleText>

          <div>
            <BottomBorder />
          </div>
        </TitleHolder>

        <BurgerWrapper>
          <PublicRoute exact path="/" component={LoginButton} />
          <PrivateRoute path="/home" component={NavBurger} />
        </BurgerWrapper>
      </TopWrapper>
    );
  }
}

export default Header;
