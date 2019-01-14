import React, { Component, createContext } from "react";
import Auth from "./Auth";

const authContext = createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    };
  }
  render() {
    return (
      <authContext.Provider value={this.state.auth}>
        {this.props.children}
      </authContext.Provider>
    );
  }
}
