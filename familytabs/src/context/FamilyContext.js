import React, { Component, createContext } from "react";
import Auth from "../auth/Auth";
import axios from 'axios'
const FamilyContext = createContext();

export class FamilyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      profile: null,
      familyID: null,
      familyEvents:[],
      family:[]
    };
  }
  testFunc = () => console.log('hello world')
  setProfile = profile => {this.setState({profile})}
  setFamilyID = familyID => {this.setState({familyID})}
  setFamilyEvents = familyEvents => {this.setState({familyEvents})}
  setFamily = family => {this.setState({family})}

  componentDidMount(){
    if (!this.state.family && this.state.familyID){
        this.loadState(this.state.familyID)
    }
}

loadState = async(id) =>{
   try{
    const familyMembers = await axios.get(`${process.env.REACT_APP_API_URL}/familymembers/${id}`)
    console.log(familyMembers)
    const familyEvents = await axios.get(`${process.env.REACT_APP_API_URL}/fulleventsbyfamily/${id}`)
   this.setFamily(familyMembers)
    this.setFamilyEvents(familyEvents)
}catch(err){
       console.log(err)
   }
}

  
  
  render() {
    const {state, testFunc, setProfile, setFamilyID, setFamilyEvents, setFamily} = this
    console.log(state)
    return (
      <FamilyContext.Provider value={{...state,testFunc, setProfile, setFamilyID, setFamilyEvents, setFamily}}>
        {this.props.children}
      </FamilyContext.Provider>
    );
  }
}

export const FamilyConsumer = FamilyContext.Consumer
