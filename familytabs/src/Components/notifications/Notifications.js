import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import { Card } from "@blueprintjs/core";
import NotificationsModal from "./NotificationsModal"


const StyledMain = styled.div`
  padding: 0 150px 0 150px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    padding:0;
  }
`;

const StyledTop = styled.div`
  color: white;
  font-size: 64px;
  margin: 0 0 25px 0;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width:100%;
  justify-content:space-between;
  @media (max-width:1220px){
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTabs = styled(Tabs)`
    height: 100%;
    width: 468px;
    padding:0;
    margin-bottom: 25px;
    @media (max-width:500px) {
      width:98%;
      margin:0 auto;
      
    }
`;

const StyledTabList = styled(TabList)`
    color: white;
    display: flex;
    justify-content: center;
    
`;

const StyledTab = styled(Tab)`
    border-left: 1px solid #22263C;
    border-right: 1px solid #22263C;
    color: white;
    background-color: #68659E;
    padding: 10px 10px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    font-family: "Roboto", sans-serif;
    font-size: 14px;

    :hover {
      color: #68659E;
      background-color: white;
      cursor: pointer;
    }
`;

const NoEventTab = styled(Card)`
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    font-weight: 10px;
    background-color: #68659E;
    padding: 100px 200px 100px 200px;
    color: white;
`;

const StyledPanel = styled(TabPanel)`
    background-color: #68659E;
    padding: 15px;
    border-left: 1px solid #22263C;
    border-right: 1px solid #22263C;
    border-radius: .5px;
`;

const Title = styled.h1`
    margin: 0 0 0 0;
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 60px;
    padding:0;
    font-weight: 700;
`;

const TitleContent = styled.p `
    display: flex;
    justify-content: flex-end;
    color: #ffffff;
    font-size: 16px;
    padding-left: 5px;
    color: #3985ac;
    width: 30%;
    margin: 0% 0% 1% 20%; 
  

  

`;

const BottomBorder = styled.div`
    border-bottom: 2px solid #D4B36E;
    height: 20px;
    width: 100%;
    margin: 0 0 50px 0;
`;


export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      id: null,
    };
  }

  toggleForm = (e=null) => {
    console.log("E", e);
    if(e === null) {
      this.setState({ showForm: !this.state.showForm});  
    } else if(e !== null){
        this.setState({ showForm: !this.state.showForm, id: e.target.id });
    }
  };

  approveClick = async e => {
    e.preventDefault();
    const id = e.target.id;
    let approve = {
      approved: true,
      pendingApproval:false
    };
    try{
      await axios.put(`${process.env.REACT_APP_API_URL}/event/edit/${id}`, approve)
      this.props.loadState(this.props.familyID)
    }catch(err){
      console.log(err)
    }
  };

  declineClick = async e => {
    e.preventDefault();
    this.toggleForm(); 
    const id = this.state.id;
    let decline = {
      declined: true,
      pendingApproval:false
    };
    try{
      await axios.put(`${process.env.REACT_APP_API_URL}/event/edit/${id}`, decline)
      this.props.loadState(this.props.familyID)
    }catch(err){
      console.log(err)
    }
  };

  render() {
    if(!this.props.family){
      return <h1>loading...</h1>
    } else if (!this.props.familyEvents.length) {
      return (
        <StyledMain>
  
          <StyledTop>
          <TitleContent>Review pending events</TitleContent>
            <Title>Child Events</Title>
            <BottomBorder></BottomBorder>
          </StyledTop>
          
          <StyledBottom>
            <NoEventTab>
                      <p>No Events to Display</p>
            </NoEventTab>
          </StyledBottom>
        </StyledMain>
      );
    } else if (this.props.familyEvents){
    return (
      <StyledMain>

        <StyledTop>
        <TitleContent>Review pending events</TitleContent>
          <Title>Notifications</Title>
          <BottomBorder></BottomBorder>
        </StyledTop>
        
        <StyledBottom>
          
          <StyledTabs>
              <StyledTabList>
                <StyledTab>PENDING</StyledTab>
                <StyledTab>APPROVED</StyledTab>
                <StyledTab>DECLINED</StyledTab>
              </StyledTabList>
              
              <StyledPanel>
                {this.props.familyEvents
                  .filter(x => x.pendingApproval)
                  .map(eventData => (
                    <EventCard
                    //every event that is pending approval will pass these props to the event card component
                    //the word pending here by itself gives the event cards that are pending approval the prop pending===true
                    pending
                      key={eventData.id}
                      eventData={eventData}
                      family={this.props.family}
                      isAdmin={this.props.profile.isAdmin}
                      approveClick={this.approveClick}
                      toggleForm={this.toggleForm}
                    />
                  ))}
              </StyledPanel>

              <StyledPanel>
                {this.props.familyEvents
                  .filter(x => x.approved)
                  .map(eventData => (
                    <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                  ))}
              </StyledPanel>

              <StyledPanel>
                {this.props.familyEvents
                  .filter(x => x.declined)
                  .map(eventData => (
                    <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                  ))}
              </StyledPanel>
          </StyledTabs>

          {this.state.showForm ? (
              <NotificationsModal
                  toggleForm={this.toggleForm}
                  {...this.state}
                  {...this.props}
                  declineClick={this.declineClick}
              />
            ) : (
              ""
            )}

        </StyledBottom>
      </StyledMain>
    );
  }
}
}
