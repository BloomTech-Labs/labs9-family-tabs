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
          <h1>Family Tabs. Keep tabs on the whole family</h1>
          <Navigation />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/admin' component={ParentHome} />
        </header>
      </div>
    )
  }
}

export default App;
