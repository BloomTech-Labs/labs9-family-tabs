import React, { Component } from "react";
import ParentHome from "./Components/calendar/ParentHome";
import LandingPage from "./Components/LandingPage";
import Notifications from "./Components/notifications/Notifications";
import Household from "./Components/household/Household";
import Billing from "./Components/Billing";
import Callback from "./Components/Callback";
import PublicRoute from "./context/PublicRoute";
import PrivateRoute from "./context/PrivateRoute";
import VerifyProfile from "./Components/VerifyProfile";
import styled from "styled-components";
import SignUp from "./Components/SignUp";
import NavBurger from "./Components/NavBurger";
import FTLogo5 from './Components/images/FT_Logo_5.jpg';
import LoginButton from "./Components/LoginButton";


const MediaStyles = styled.div`
    max-width: 100%;
    background-color: #242943;
    height: 100vh;

  @media (min-width: 1024px) and (max-width: 1281px) {
    max-width: 100%;

  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 100%;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    max-width: 100%;
  }

`;

const AppStyles = styled.div`
  font-family: "Lato", sans-serif;
  text-align: center;
  max-width: 100%;
  background-color: #242943;
`;

const StyleMain = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  /* border: 2px solid red; */
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 98%;
  /* border: 2px solid red; */
  padding-top: 5px;
  margin-left: 10px;
`;

const ImageWrapper = styled.div`
  /* border: 2px solid red; */
`;

const BurgerWrapper = styled.div`
  /* border: 2px solid red; */
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 7.5px;
`;

const LogoImage = styled.img`
  width: 7.5%;
  /* height: 25%; */
  border-radius: 25%;
  /* border: 2px solid red; */
  opacity: 0.3;
  /* margin-right: 90%; */
`;



class App extends Component {
  render() {
    return (
      <MediaStyles>
        <TopWrapper>
          <ImageWrapper>
            <LogoImage src={FTLogo5} alt="FTLogo5"></LogoImage>
          </ImageWrapper>
          <BurgerWrapper>
            <PublicRoute exact path='/' component={LoginButton}></PublicRoute>
            <PrivateRoute path="/home" component={NavBurger} />
          </BurgerWrapper>
        </TopWrapper>
        <StyleMain>
          
        </StyleMain>
        <AppStyles>
          <PublicRoute exact path="/" component={LandingPage} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/home/tabs" component={ParentHome} />
          <PrivateRoute exact path="/home/notifications" component={Notifications}/>
          <PrivateRoute exact path="/home/household" component={Household} />
          <PrivateRoute exact path="/home/billing" component={Billing} />
          <PublicRoute path="/callback" component={Callback} />
        </AppStyles>
        <PrivateRoute path="/verify" component={VerifyProfile} />
      </MediaStyles>

    );
  }
}

export default App;
