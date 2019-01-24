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
      scheduledEvent_name: "",
      eventStart: null,
      eventEnd: null,
      eventTypeID: null,
      locationID: null,
      eventTypes: [],
      locations: [],
      showForm: false
    };
  }

  componentDidMount() {
    this.loadState();
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

      let starter = new Date(
        moment(
          `${eventStart.split(", ")[0]} ${eventStart
            .split(", ")[1]
            .slice(0, 5)
            .split(":")
            .join("")}`
        )
      );
      let ender = new Date(
        moment(
          `${eventStart.split(", ")[0]} ${eventStart
            .split(", ")[1]
            .slice(0, 5)
            .split(":")
            .join("")}`
        ).add(3, "hours")
      );
      return {
        title: scheduledEvent_name,
        start: starter,
        end: ender,
        participants: `${userName.join(", ")}`,
        particulars: `${eventType_name} event at ${location_name} ${address}`
        //allDay:true
      };
    });

  setStart = e => {
    this.setState({ eventStart: e });
  };

  setEnd = e => {
    this.setState({ eventEnd: e });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addEventHandler = async e => {
    e.preventDefault();
    const {
      scheduledEvent_name,
      eventStart,
      eventEnd,
      // eventTypeID,
      // locationID
      locations,
      events
    } = this.state;
    if (
      !scheduledEvent_name ||
      !eventStart ||
      !eventEnd 
      //|| !eventTypeID ||
      // !locationID
    ) {
      return;
    }

    let newEvent = {
      scheduledEvent_name,
      eventStart,
      eventEnd,
      eventTypeID: 1,
      locationID: 1,
      familyID: this.props.familyID,
      createdByAdmin: this.props.profile.isAdmin ? 1 : 0
    };
    this.setState({
      events: [...this.state.events, newEvent],
      title: "",
      dateStart: "",
      dateEnd: ""
    });
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/event/create`,
        newEvent
      );
      this.toggleForm();
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
            inputHandler={this.inputHandler}
            addEventHandler={this.addEventHandler}
            setStart={this.setStart}
            setEnd={this.setEnd}
            state={this.state}
          />
        ) : (
          <button onClick={this.toggleForm}>New Event</button>
        )}
      </div>
    );
  }
}

export default CalendarComponent;
