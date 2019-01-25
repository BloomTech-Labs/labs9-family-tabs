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
const Event = ({ event }) => {
  return (
    <span>
      <p>{event.title}</p>
      <p>{event.participants}</p> <p>{event.particulars}</p>
    </span>
  );
};
class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventTypes: [],
      locations: [],
      showForm: false
    };
  }

  componentDidMount() {
    this.loadState();
  }

  addOption = (name, option) =>{
    this.setState({[`${name}s`]: [...this.state[`${name}s`], option] })
  }

  toggleForm = () => {
    this.loadState();
    this.setState({ showForm: !this.state.showForm });
  };


  loadState = async () => {
    const { familyEvents, familyID } = this.props;
    let { locations, eventTypes, events } = this.state;
    if (!locations.length) {
      locations = await axios.get(
        `${process.env.REACT_APP_API_URL}/location/byfamily/${familyID}`
      );
      this.setState({ locations: locations.data });
    }
    if (!eventTypes.length) {
      eventTypes = await axios.get(
        `${process.env.REACT_APP_API_URL}/eventtype/byfamily/${familyID}`
      );
      this.setState({ eventTypes: eventTypes.data });
    }
    if (!events.length) {
      events = this.mapToCalendar(familyEvents);
      this.setState({ events });
    }
  };

  mapToCalendar = events =>
    events.map((event, i) => {
      const {
        address,
        scheduledEvent_name,
        location_name,
        eventType_name,
        eventStart,
        //eventEnd,
        userName
      } = event;

      let starter = moment(eventStart, "YYYYMMDD hh:mm a");
      let ender = moment(eventStart, "YYYYMMDD hh:mm a").add(3, "hours");
      return {
        title: scheduledEvent_name,
        start: starter,
        end: ender,
        participants: `${userName.join(", ")}`,
        particulars: `${eventType_name} event at ${location_name} ${address}`
        //allDay:true
      };
    });

  addToCalendar = async eventData => {
    try {
      let addedEvent = await axios.post(
        `${process.env.REACT_APP_API_URL}/event/create`,
        eventData
      );
      addedEvent = {
        ...addedEvent.data[0],
        eventStart: moment(addedEvent.data[0].eventStart, "YYYYMMDD hh:mm a"),
        eventEnd: moment(addedEvent.data[0].eventEnd, "YYYYMMDD hh:mm a")
      };
      console.log(addedEvent)
      this.setState({events:[...this.state.events, addedEvent]})
      
      return addedEvent;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let events;
    if (!this.state.events.length) {
      events = this.mapToCalendar(this.props.familyEvents);
    }
    console.log(this.state);
    return (
      <div>
        <div className="CalendarComponent">
          <StyledCalendar
            day={1}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events.length ? this.state.events : events}
            components={{
              event: Event
            }}
          />
        </div>
        {this.state.showForm ? (
          <AddEvent
            toggleForm={this.toggleForm}
            addToCalendar={this.addToCalendar}
            state={this.state}
            addOption={this.addOption}
            familyID={this.props.familyID}
            isAdmin={this.props.profile.isAdmin}
          />
        ) : (
          <button onClick={this.toggleForm}>New Event</button>
        )}
      </div>
    );
  }
}

export default CalendarComponent;