import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";


const StyledMain = styled.div`
  padding: 0 150px 0 150px;

  @media (min-width: 320px) and (max-width: 481px) {

  }
`;

const StyledTabs = styled(Tabs)`
    height: 100%;
`;

const StyledTabList = styled(TabList)`
    color: white;
    display: flex;
`;

const StyledTab = styled(Tab)`
    border-top: 1px solid #64AAC4;
    border-right: 1px solid #64AAC4;
    border-left: 1px solid #64AAC4;
    color: white;
    background-color: #68659E;
    padding: 5px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    :hover {
      color: #68659E;
      background-color: white;
      cursor: pointer;
    }
`;

const StyledTabPanel = styled(TabPanel)`
    background-color: #68659E;
    padding: 15px;
    

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
