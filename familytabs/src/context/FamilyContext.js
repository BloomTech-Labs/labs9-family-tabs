import React, { Component, createContext } from "react";
import Auth from "../auth/Auth";

const FamilyContext = createContext();

export class FamilyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      profile: null
    };
  }
  testFunc = () => console.log('hello world')
  setUserProfile = userProfile => {this.setState({profile:userProfile})}
  
  render() {
    return (
      <FamilyContext.Provider value={{...this.state, testFunc:this.testFunc, setUserProfile:this.setUserProfile}}>
        {this.props.children}
      </FamilyContext.Provider>
    );
  }
}

export const FamilyConsumer = FamilyContext.Consumer
