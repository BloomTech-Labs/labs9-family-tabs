import React, { Component, createContext } from "react";
import Auth from "./Auth";

const authContext = createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test:'test'  ,
      auth: new Auth(this.props.history)
      
    };
  }
  render() {
    return (
      <authContext.Provider value={this.state}>
        {this.props.children}
      </authContext.Provider>
    );
  }
}

export const AuthConsumer = authContext.Consumer
