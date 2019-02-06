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
import FTLogo8 from './Components/images/FT_Logo_8.png';
import LoginButton from "./Components/styled/LoginButton";


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
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 98%;
  padding-top: 5px;
  margin-left: 10px;
`;

const ImageWrapper = styled.div`
`;

const BurgerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 7.5px;
`;

const LogoImage = styled.img`
  width: 200px;
  background-color: #242943;
  opacity: 1;
`;



class App extends Component {
  render() {
    return (
      <MediaStyles>
        <TopWrapper>
          <ImageWrapper>
            <LogoImage src={FTLogo8} alt="FTLogo8"></LogoImage>
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
