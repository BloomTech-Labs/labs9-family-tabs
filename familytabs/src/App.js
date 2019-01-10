import React, { Component } from 'react';
import { Route } from "react-router-dom"; 
import Navigation from "./Components/Navigation"
import ParentHome from './Components/ParentHome'
import LandingPage from './Components/LandingPage'
import Notifications from './Components/Notifications';
import Settings from './Components/Settings';
import Household from './Components/Household';
import Billing from './Components/Billing';


class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Route path='/home' component={Navigation}/>
          <Route exact path='/' component={LandingPage} />
          <div className="home">
            <h1>Family Tabs. Keep tabs on the whole family</h1>
            <Route exact path='/home/tabs' component={ParentHome} />
            <Route exact path='/home/notifications' component={Notifications} />
            <Route exact path='/home/settings' component={Settings} />
            <Route exact path='/home/household' component={Household} />
            <Route exact path='/home/billing' component={Billing} />
          </div>
        </header>
      </div>
    )
  }
}

export default App;
