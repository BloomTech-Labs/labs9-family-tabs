import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";
//import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";

const StyledTabs = styled(Tabs)`
  .react-tabs__tab-list {
    border: 2px solid red;
    display: flex;
    margin: 0 0 10px;
    padding-top: 15px;
  }
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
      <div>
        <h1>I am the Notifications page</h1>
        <StyledTabs>
          <Tabs>
            <TabList>
              <Tab>Pending</Tab>
              <Tab>Approved</Tab>
              <Tab>Declined</Tab>
            </TabList>

            <TabPanel>
              {this.props.familyEvents
                .filter(x => x.pendingApproval)
                .map(eventData => (
                  <EventCard
                    key={eventData.id}
                    eventData={eventData}
                    pending
                    family={this.props.family}
                    isAdmin ={this.props.profile.isAdmin}
                    approveClick={this.approveClick}
                    declineClick={this.declineClick}
                  />
                ))}
            </TabPanel>
            <TabPanel>
              {this.props.familyEvents
                .filter(x => x.approved)
                .map(eventData => (
                  <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                ))}
            </TabPanel>
            <TabPanel>
              {this.props.familyEvents
                .filter(x => x.declined)
                .map(eventData => (
                  <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                ))}
            </TabPanel>
          </Tabs>
        </StyledTabs>
      </div>
    );
  }
}
