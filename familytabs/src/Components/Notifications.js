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
    componentWillMount() {
      axios.get(`${process.env.REACT_APP_API_URL}/event/`)
      .then(eventdata => {
        this.setState({eventdata: eventdata.data});
        console.log(eventdata);
        console.log('axios-state', eventdata.data);
      })
      .catch(err => {
        console.log('running')
        console.log(err); 
      });
    }
    componentDidMount() {
      console.log('state', this.state);
      this.state.eventdata.map(eventsmapped => {
        let today = moment();
        let eventData = moment(eventsmapped.eventStart, "YYYYMMDD, h:mm a")
        console.log('eventsmapped', eventsmapped);
        if(eventData >= today && eventsmapped.approved === 0 && eventsmapped.declined === 0 && eventsmapped.createdByAdmin === 0) {
          console.log('running')
          let pendingdata = this.state.pendingdata.splice();
          pendingdata.push(eventsmapped);
          this.setState({pendingdata});
        }
      })
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>I am the Notifications page</h1>
        <NotifcationTabs />
      </div>
    )
  }
}
