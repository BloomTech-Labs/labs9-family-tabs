import React, { Component } from "react";
import Navigation from "./Components/Navigation";
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

class App extends Component {
  render() {
    return (
      // start comment out
      
        <div>
          <PrivateRoute path='/verify' component={VerifyProfile}></PrivateRoute>
          <PublicRoute exact path="/" component={LandingPage} />
          <PrivateRoute path="/home" component={Navigation} />
          <div className="home">
            <h1>Family Tabs. Keep tabs on the whole family</h1>
            <PrivateRoute exact path="/home/tabs" component={ParentHome} />
            <PrivateRoute
              exact
              path="/home/notifications"
              component={Notifications}
            />
            <PrivateRoute exact path="/home/settings" component={Settings} />
            <PrivateRoute exact path="/home/household" component={Household} />
            <PrivateRoute exact path="/home/billing" component={Billing} />
            <PublicRoute path="/callback" component={Callback} />
            
          </div>
        </div>
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
