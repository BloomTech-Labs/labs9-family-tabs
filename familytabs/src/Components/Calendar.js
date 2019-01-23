import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import AddEvent from "./AddEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = Calendar.momentLocalizer(moment);
const StyledCalendar = styled(Calendar)`
  /* play with the inspector in the browser to see what things are called and how best to interact with them. Have fun */
  .rbc-month-view {
    border-radius: 21px;
    overflow: hidden;
    height: 800px;
    border-color: red;
  }

  .rbc-day-bg {
    background: white;
  }

  .rbc-date-cell {
    display: flex;
    justify-content: center;
    font-family: "Lato", sans-serif;
    font-size: 12px;
    padding-top: 5px;
  }

  .rbc-toolbar-label {
    font-family: "Lato", sans-serif;
  }

  .rbc-header {
    font-family: "Lato", sans-serif;
    padding: 15px;
    font-weight: 300;
  }
`;
const Event =({event})=>{
    return(
      <span>
        <p>{event.title}</p><p>{event.desc}</p> 
      </span>
    )
  }
class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: "",
      dateStart: "",
      dateEnd: "",
      phone: "",
      body: ""
    };
  }
  

  mapToCalendar = events =>
    events.map((event,i) => {
      const {
        address,
        scheduledEvent_name,
        location_name,
        eventType_name,
        eventStart,
        eventEnd,
        userName
      } = event;

      console.log( eventEnd)
      let starter= new Date(moment(`${eventStart.split(', ')[0]} ${eventStart.split(', ')[1].slice(0,5).split(':').join('')}`).add(i, 'days'))
      let ender = new Date(moment(`${eventStart.split(', ')[0]} ${eventStart.split(', ')[1].slice(0,5).split(':').join('')}`).add(i, 'days'))
      return { 
        title: scheduledEvent_name,
        start:starter,
        end: ender,
        desc: `${userName.join(' ')} ${eventType_name} event at ${location_name} ${address}`,
        //allDay:true
        
      };
    });

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addEventHandler = e => {
    e.preventDefault();

    let Event = this.state.Event.slice();

    let newEvent = {
      title: this.state.title,
      start: this.state.dateStart,
      end: this.state.dateEnd,
      phone: this.state.phone,
      body: this.state.body,
      allDay: true
    };

    Event.push(newEvent);

    this.setState({ Event: Event, title: "", dateStart: "", dateEnd: "" });

    axios
      .post(`${process.env.REACT_APP_API_URL}/event/create`, newEvent)
      .then(event => {
        console.log(event);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post(`${process.env.REACT_APP_API_URL}/text`, newEvent)
      .then(text => {
        console.log("You rang?", text);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.props.familyEvents) {
      return <h1>loading</h1>;
    }
    console.log(this.props.familyEvents);
    let events = this.mapToCalendar(this.props.familyEvents);
    console.log(events);
    return (
      <div>
        <div className="CalendarComponent">
          <StyledCalendar
            day={1}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            components={{
              event:Event
            }}
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
