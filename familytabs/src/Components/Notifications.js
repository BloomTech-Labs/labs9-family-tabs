import React, { Component } from 'react'
import NotificationCard from './NotificationCard'
import NotifcationTabs from './NotificationTabs';
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
        })
      })
    }


    clickHandler = (e) => { 
      e.preventDefault()
      const id = this.state.eventdata
      axios.put(`${process.env.REACT_APP_API_URL}/event/edit/${id}`)
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

<NotificationCard key={pendingdata.id} pendingdata={pendingdata} clickHandler={this.clickHandler}/>


))}   
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
          </StyledTabs>
      </div>
    )
  }
}
