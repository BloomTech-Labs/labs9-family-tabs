import React, { Component } from 'react'
import NotifcationTabs from './NotificationTabs';
import axios from 'axios';
import moment from 'moment';


export default class Notifications extends Component {
    constructor() {
      super();
      this.state = { 
        eventdata: [],
        pendingdata: [] };
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


  render() {
    console.log("rendered",this.state);
    return (
      <div>
        <h1>I am the Notifications page</h1>
        <NotifcationTabs />
      </div>
    )
  }
}
