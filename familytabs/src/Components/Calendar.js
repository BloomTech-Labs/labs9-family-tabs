import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import styled from 'styled-components';
import AddEvent from './AddEvent';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { props } from "bluebird";
import axios from 'axios'

const localizer = Calendar.momentLocalizer(moment);
const StyledCalendar = styled(Calendar)`
  /* play with the inspector in the browser to see what things are called and how best to interact with them. Have fun */
  .rbc-month-view {
    border-radius: 21px;
    overflow: hidden;
    height: 800px;
    border-color:red;
  }

  .rbc-day-bg {
    background: white;
    :nth-child(1){
    background: white;
    }
  }
  
  .rbc-date-cell {
    display:flex;
    justify-content: center;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    padding-top: 5px;
  }
  
  .rbc-toolbar-label{
    font-family: 'Lato', sans-serif;
  }
  
  .rbc-header {
    font-family: 'Lato', sans-serif;
    padding: 15px;
    font-weight: 300;
  }
`;

class CalendarComponent extends Component {
  constructor(){
    super();
    this.state = {
      Event: [],
      title: '',
      dateStart: '',
      dateEnd: '',
      phone:'',
      body:'',
    }
  }

  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

inputHandler = e => {
  this.setState({ [e.target.name]: e.target.value });
}

addEventHandler = (e) => {
 e.preventDefault(); 

 let Event = this.state.Event.slice()

 let newEvent = {
  title: this.state.title,
  start: this.state.dateStart,
  end: this.state.dateEnd,
  phone: this.state.phone,
  body: this.state.body,
  allDay: true,
 };

 Event.push(newEvent); 

 this.setState({Event: Event, title: '', dateStart: '', dateEnd: ''});


 axios.post(`${process.env.REACT_APP_API_URL}/event/create`, newEvent)
   .then(event => {
      console.log(event);
   })
   .catch(err => {
     console.log(err); 
   });

 axios.post(`${process.env.REACT_APP_API_URL}/text`, newEvent)
   .then(text => {
      console.log("You rang?", text);
   })
   .catch(err => {
     console.log(err); 
   });
};



  render() { console.log(this.state)
    return (
      <div>
        <div className="CalendarComponent">
          <StyledCalendar 
            day={1}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.Event}
          />
        </div>
        <div>
          <AddEvent
            inputHandler={this.inputHandler}
            addEventHandler={this.addEventHandler}
          />
        </div>
      </div>
    );
  }
}

export default CalendarComponent;