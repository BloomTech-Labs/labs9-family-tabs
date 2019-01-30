import React, { Component } from "react";
import ParentHome from "./Components/calendar/ParentHome";
import LandingPage from "./Components/LandingPage";
import Notifications from "./Components/notifications/Notifications";
import Settings from "./Components/Settings";
import Household from "./Components/household/Household";
import Billing from "./Components/Billing";
import Callback from "./Components/Callback";
import PublicRoute from "./context/PublicRoute";
import PrivateRoute from "./context/PrivateRoute";
import VerifyProfile from "./Components/VerifyProfile";
import styled from "styled-components";
import SignUp from "./Components/SignUp";
import NavBurger from "./Components/NavBurger";


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


class App extends Component {
  render() {
    return (
      // start comment out
      <MediaStyles>
        <div>
          <PrivateRoute path="/verify" component={VerifyProfile} />
          <PrivateRoute path="/home" component={NavBurger} />
        </div>
        <AppStyles>
          <PublicRoute exact path="/" component={LandingPage} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/home/tabs" component={ParentHome} />
          <PrivateRoute exact path="/home/notifications" component={Notifications}/>
          <PrivateRoute exact path="/home/settings" component={Settings} />
          <PrivateRoute exact path="/home/household" component={Household} />
          <PrivateRoute exact path="/home/billing" component={Billing} />
          <PublicRoute path="/callback" component={Callback} />
        </AppStyles>
      </MediaStyles>

    );
  }
}

export default App;
