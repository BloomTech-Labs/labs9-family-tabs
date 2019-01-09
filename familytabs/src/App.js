import React, { Component } from 'react';
import { Route } from "react-router-dom"; 
import Navigation from "./Components/Navigation"
import ParentHome from './Components/ParentHome'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Family Tabs. Keep tabs on the whole family</h1>
          <Navigation />
          <Route exact path='/' component={ParentHome} />
        </header>
      </div>
    )
  }
}

export default App;
