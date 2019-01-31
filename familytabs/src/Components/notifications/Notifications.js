import React, { Component } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import BaseballGirl from "../images/baseballgirl.png";


const StyledMain = styled.div`
  padding: 0 150px 0 150px;
  display: flex;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 481px) {

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
  flex-direction: row;
`;

const StyledLeft = styled.div`
  width: 40%;
`;

const StyledRight = styled.div`
  width: 60%;
`;

const ImageStyles = styled.img `
    width: 600px;
    height: 450px;
    margin: 50px 0 0 50px;
`;

const StyledTabs = styled(Tabs)`
    height: 100%;
`;

const StyledTabList = styled(TabList)`
    color: white;
    display: flex;
    
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

const StyledPendingPanel = styled(TabPanel)`
    background-color: #68659E;
    padding: 15px;
    border-left: 1px solid #22263C;
    border-right: 1px solid #22263C;
`;

const StyledApprovedPanel = styled(TabPanel)`
    background-color: #68659E;
    padding: 1px 15px 75px;
    border-left: 1px solid #22263C;
    border-right: 1px solid #22263C;
`;

const StyledDeclinedPanel = styled(TabPanel)`
    background-color: #68659E;
    padding: 1px 15px 75px;
    border-left: 1px solid #22263C;
    border-right: 1px solid #22263C;
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

const BottomBorder = styled.div`
    border-bottom: 2px solid #D4B36E;
    height: 20px;
    width: 100%;
    margin: 0 0 50px 0;
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

        <StyledTop>
          <Title>Notifications</Title>
          <BottomBorder></BottomBorder>
        </StyledTop>
        
        <StyledBottom>
          <StyledLeft>
          <StyledTabs>
              <StyledTabList>
                <StyledTab>PENDING</StyledTab>
                <StyledTab>APPROVED</StyledTab>
                <StyledTab>DECLINED</StyledTab>
              </StyledTabList>
              
              <StyledPendingPanel>
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
                      declineClick={this.declineClick}
                    />
                  ))}
              </StyledPendingPanel>

              <StyledApprovedPanel>
                {this.props.familyEvents
                  .filter(x => x.approved)
                  .map(eventData => (
                    <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                  ))}
              </StyledApprovedPanel>

              <StyledDeclinedPanel>
                {this.props.familyEvents
                  .filter(x => x.declined)
                  .map(eventData => (
                    <EventCard key={eventData.id} family={this.props.family} eventData={eventData} />
                  ))}
              </StyledDeclinedPanel>
          </StyledTabs>
          </StyledLeft>

          <StyledRight>
            <ImageStyles src={BaseballGirl} alt="Little girl playing baseball"></ImageStyles>
          </StyledRight>
        </StyledBottom>
      </StyledMain>
    );
  }
}
