import React, { Component } from 'react';
import PendingCard from './PendingCard';
import ApprovedCard from './ApproveCard';
import DeclineCard from './DeclineCard';
import axios from 'axios';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
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
    constructor() {
      super();
      this.state = { 
        eventdata: [],
        pendingdata: [],
        approveddata: [],
        declineddata:[]
       };
    }


    componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_URL}/event/`)
      .then(eventdata => {
        this.setState({eventdata: eventdata.data});
      })
      .catch(err => {
        console.log('running')
        console.log(err); 
      })
      .then ( () => {
        this.state.eventdata.map(eventsmapped => {
          let today = moment();
          let eventData = moment(eventsmapped.eventStart, "YYYYMMDD, h:mm a")
  
          if(eventData >= today && eventsmapped.approved === 0 && eventsmapped.declined === 0 && eventsmapped.createdByAdmin === 0) {
            let pendingdata = this.state.pendingdata.splice();
            pendingdata.push(eventsmapped);
            this.setState({pendingdata});

           
          }
          else if(eventsmapped.approved === 1 && eventsmapped.declined === 0 && eventsmapped.createdByAdmin === 0) {
            let approveddata = this.state.approveddata.splice();
            approveddata.push(eventsmapped);
            this.setState({approveddata});
          }
          else if(eventsmapped.approved === 0 && eventsmapped.declined === 1 && eventsmapped.createdByAdmin === 0) {
            let declineddata = this.state.declineddata.splice();
            declineddata.push(eventsmapped);
            this.setState({declineddata});
          }
      })
    })
    }


    approveClick = (e) => { 
      console.log("TARGET ID",e.target.id)
      e.preventDefault()
      const id = e.target.id
      let reqBody = {
        approved: 1,
      }

      axios.put(`${process.env.REACT_APP_API_URL}/event/edit/${id}`, reqBody)
      .then(resp => console.log(resp))
      
      .catch( error => {
        console.log(error)
      })
    }

    declineClick = (e) => { 
      console.log("TARGET ID",e.target.id)
      e.preventDefault()
      const id = e.target.id
      let reqBody = {
        declined: 1,
      }

      axios.put(`${process.env.REACT_APP_API_URL}/event/edit/${id}`, reqBody)
      .then(resp => console.log(resp))
      
      .catch( error => {
        console.log(error)
      })
    }

  render() {
    console.log("rendered",this.state);
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
            {this.state.pendingdata.map(pendingdata => (

<PendingCard key={pendingdata.id} pendingdata={pendingdata} approveClick={this.approveClick} declineClick={this.declineClick}/>


))}   
            </TabPanel>
            <TabPanel>
            {this.state.approveddata.map(approveddata => (

<ApprovedCard key={approveddata.id} approveddata={approveddata} />


))}   
            </TabPanel>
            <TabPanel>
            {this.state.declineddata.map(declineddata => (

<DeclineCard key={declineddata.id} declineddata={declineddata} />


))}   
            </TabPanel>
          </Tabs>
          </StyledTabs>
      </div>
    )
  }
}
