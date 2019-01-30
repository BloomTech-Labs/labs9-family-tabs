import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import axios from "axios";
import Select from "react-select";
import AddEvent from "./AddEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
  .rbc-row-content{
    z-index:0;
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
      eventTypes: [],
      locations: [],
      participants:[],
      showForm: false,
    };
  }

  componentDidMount() {
    this.loadState();
  }

  participantToOptions = options =>
    options
      .map(option => {
        return { value: option.id, label: option.userName };
      }).concat([{value:'pending', label:'Events Pending Approval'},{value:'declined', label:'Declined Events'}])
      

  onInputChange = (inputValue, { action }) => {
    if(!inputValue.length){
      this.setState({participants:[]})
      return
    }
    let lastType = typeof inputValue[inputValue.length-1].value
    this.setState({ participants: inputValue.filter(input => typeof input.value === lastType) });
  };

  addOption = (name, option) => {
    this.setState({ [`${name}s`]: [...this.state[`${name}s`], option] });
  };

  toggleForm = () => {
    this.loadState();
    this.setState({ showForm: !this.state.showForm });
  };

  loadState = async () => {
    const {  familyID } = this.props;
    let { locations, eventTypes } = this.state;
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

  };

  mapToCalendar = events =>
    events.map((event, i) => {
      const {
        address,
        scheduledEvent_name,
        location_name,
        eventType_name,
        eventStart,
        eventEnd,
        userName,
        userID,
        pendingApproval,
        declined
      } = event;

      let startTime = new Date(moment(eventStart, "YYYYMMDD hh:mm a"));
      let endTime = new Date(moment(eventEnd, "YYYYMMDD hh:mm a"));
      return {
        title: scheduledEvent_name,
        start: startTime,
        end: endTime,
        participants: `${userName.join(", ")}`,
        particulars: `${eventType_name} event at ${location_name} ${address}`,
        userID,
        pendingApproval,
        declined
      };
    })
    .filter(event=>{
      const {participants} = this.state
      if(participants.length && typeof participants[0].value===`string`){
        if(participants.some(x => x.value === 'pending') && event.pendingApproval){
          return true
        }
        if(participants.some(x => x.value === 'declined') && event.declined){
          return true
        }
        return false
      }
      if(event.pendingApproval || event.declined){
        return false
      }
      if(!participants.length){
        return true
      }
      let currentFamilyIDs = participants.map(person => person.value)
      return currentFamilyIDs.some(id => event.userID.includes(id))
    });

  addToCalendar = async eventData => {
    try {
      let addedEvent = 
      await axios.post(
        `${process.env.REACT_APP_API_URL}/event/create`,
        eventData
      );
      addedEvent = {
        ...addedEvent.data[0],
        eventStart: moment(addedEvent.data[0].eventStart, "YYYYMMDD hh:mm a"),
        eventEnd: moment(addedEvent.data[0].eventEnd, "YYYYMMDD hh:mm a")
      };
      console.log(addedEvent)
      return addedEvent;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state)
    let events  = this.mapToCalendar(this.props.familyEvents);;

    return (
      <div>
        <div className="CalendarComponent">
          <Select
            placeholder="Filter by Family Members"
            name="participants"
            defaultValue={this.state.participants}
            isMulti
            options={this.participantToOptions(this.props.family)}
            value={this.state.participants}
            onChange={this.onInputChange}
          />
          <StyledCalendar
            day={1}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
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
            profile={this.props.profile}
            family={this.props.family}
            loadGlobal={this.props.loadState}
            history={this.props.history}
          />
        ) : (
          <button onClick={this.toggleForm}>New Event</button>
        )}
      </div>
    );
  }
}

export default CalendarComponent;
