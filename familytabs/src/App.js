import React, { Component } from "react";
import ParentHome from "./Components/ParentHome";
import LandingPage from "./Components/LandingPage";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import Household from "./Components/Household";
import Billing from "./Components/Billing";
import Callback from "./Components/Callback";
import PublicRoute from "./context/PublicRoute";
import PrivateRoute from "./context/PrivateRoute";
import VerifyProfile from "./Components/VerifyProfile";
import AddEvent from "./Components/AddEvent";
import styled from "styled-components";
import SignUp from "./Components/SignUp";
import NavBurger from "./Components/NavBurger";
import FTLogo3 from './Components/images/FTLogo3.jpg';

const MediaStyles = styled.div`
@media (max-width: 1281px) {
    background: palevioletred;
  }
  
@media (min-width: 1025px) and (max-width: 1280px) {
  background: salmon;
}

@media (min-width: 768px) and (max-width: 1024px) {
  background: palegreen;
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  background: gray;
}

@media (min-width: 481px) and (max-width: 767px) {
  background: bisque;
  margin: auto;
}


@media (min-width: 320px) and (max-width: 480px) {
  background: lightseagreen;
}
`;

const AppStyles = styled.div`
  border: 2px solid orange; 
  /* margin-left: 300px; */
  font-family: 'Lato', sans-serif;
  text-align: center;
  max-width: 1000px;
  height: 900px;
  background-color: #2da9d2;
`;

const LogoStyles = styled.img`
  height: 10%;
  width: 10%;
`;

class App extends Component {
  render() {
    return (

      // start comment out
      
        <MediaStyles>
          <PrivateRoute path='/verify' component={VerifyProfile}></PrivateRoute>
          
          <PrivateRoute path="/home" component={NavBurger} />
          <AppStyles>
            <LogoStyles src={FTLogo3} alt="FTLogo3"></LogoStyles>
            <PublicRoute exact path="/" component={LandingPage} />
            <PublicRoute exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/home/tabs" component={ParentHome} />
            <PrivateRoute exact path="/home/add-event" component={AddEvent}/>
            <PrivateRoute
              exact
              path="/home/notifications"
              component={Notifications}
            />
            <PrivateRoute  exact path="/home/settings" component={Settings} />
            <PrivateRoute exact path="/home/household" component={Household} />
            <PrivateRoute exact path="/home/billing" component={Billing} />
            <PublicRoute path="/callback" component={Callback} />
            
          </AppStyles>
        </MediaStyles>
        //end comment out

  
      // //Uncomment these and comment the above to bypass login screen 

      //   <div>
      //     <PublicRoute exact path="/" component={LandingPage} />
      //     <PublicRoute path="/home" component={Navigation} />
      //     <div className="home">
      //       <PublicRoute exact path="/home/tabs" component={ParentHome} />
      //       <PublicRoute
      //         exact
      //         path="/home/notifications"
      //         component={Notifications}
      //       />
      //       <PublicRoute exact path="/home/settings" component={Settings} />
      //       <PublicRoute exact path="/home/household" component={Household} />
      //       <PublicRoute exact path="/home/billing" component={Billing} />
      //       <PublicRoute path="/callback" component={Callback} />
      //     </div>
      //   </div>
     
    );
  }
}

export default App;