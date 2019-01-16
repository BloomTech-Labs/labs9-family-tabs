import React, { Component } from 'react';
import { Route } from "react-router-dom"; 
import Navigation from "./Components/Navigation"
import ParentHome from './Components/ParentHome'
import LandingPage from './Components/LandingPage'
import Notifications from './Components/Notifications';
import Settings from './Components/Settings';
import Household from './Components/Household';
import Billing from './Components/Billing';
import Callback from './Components/Callback';
import PublicRoute from './context/PublicRoute'
import PrivateRoute from './context/PrivateRoute'



class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Route path='/home' component={Navigation}/>
          <PublicRoute exact path='/' component={LandingPage} />
          <div className="home">
            <h1>Family Tabs. Keep tabs on the whole family</h1>
            <PrivateRoute exact path='/home/tabs' component={ParentHome} />
            <PrivateRoute exact path='/home/notifications' component={Notifications} />
            <PrivateRoute exact path='/home/settings' component={Settings} />
            <PrivateRoute exact path='/home/household' component={Household} />
            <PrivateRoute exact path='/home/billing' component={Billing} />
            <PublicRoute path='/callback' component={Callback}/>

            {/* 
            Uncomment these and comment the above to bypass login screen

            <PublicRoute exact path='/home/tabs' component={ParentHome} />
            <PublicRoute exact path='/home/notifications' component={Notifications} />
            <PublicRoute exact path='/home/settings' component={Settings} />
            <PublicRoute exact path='/home/household' component={Household} />
            <PublicRoute exact path='/home/billing' component={Billing} />
            <PublicRoute path='/callback' component={Callback}/> */}
          </div>
        </header>
      </div>
    )
  }
}

export default App;
