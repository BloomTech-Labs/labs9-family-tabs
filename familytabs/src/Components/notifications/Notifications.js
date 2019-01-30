import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";


const StyledMain = styled.div`
  border: 5px solid orange;
  padding: 0 150px 0 150px;
  height: 800px;

  @media (min-width: 320px) and (max-width: 481px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
  }
`;

const StyledTabs = styled(Tabs)`
    border: 5px solid purple;
    margin: 0 10px;
    padding-top: 15px;
`;

const StyledTabList = styled(TabList)`
    border: 5px solid grey;
    color: white;
    display: flex;
`;

const StyledTab = styled(Tab)`
    border: 5px solid yellow;
    color: white;
`;

const StyledTabPanel = styled(TabPanel)`
    border: 5px solid red;
    margin: 0 10px;
    padding-top: 15px;
    color: white;
    font-family: "Lato", sans-serif;

`;


export default class Notifications extends Component {

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
    const id = e.target.id;
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
    }

    return (
      <StyledMain>
        <h1>Notifications</h1>
        <StyledTabs>
            <StyledTabList>
              <StyledTab>Pending</StyledTab>
              <StyledTab>Approved</StyledTab>
              <StyledTab>Declined</StyledTab>
            </StyledTabList>

            <StyledTabPanel>
              {this.props.familyEvents
                .filter(x => x.pendingApproval)
                .map(eventData => (
                  <EventCard
                    key={eventData.id}
                    eventData={eventData}
                    family={this.props.family}
                    isAdmin={this.props.profile.isAdmin}
                    approveClick={this.approveClick}
                    declineClick={this.declineClick}
                  />
                ))}
            </StyledTabPanel>

            <StyledTabPanel>
              {this.props.familyEvents
                .filter(x => x.approved)
                .map(eventData => (
                  <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                ))}
            </StyledTabPanel>

            <StyledTabPanel>
              {this.props.familyEvents
                .filter(x => x.declined)
                .map(eventData => (
                  <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                ))}
            </StyledTabPanel>
        </StyledTabs>
      </StyledMain>
    );
  }
}
