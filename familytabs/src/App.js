import React, { Component } from 'react';
import { Route } from "react-router-dom"; 
import Navigation from "./Components/Navigation"
import ParentHome from './Components/ParentHome'
import LandingPage from './Components/LandingPage'


class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Route path='/home' component={Navigation}/>
          <Route exact path='/' component={LandingPage} />
          <div className="home">
            <h1>Family Tabs. Keep tabs on the whole family</h1>
            <Route exact path='/home/admin' component={ParentHome} />
          </div>
        </header>
      </div>
    )
  }
}

export default App;
