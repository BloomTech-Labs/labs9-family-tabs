import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import axios from "axios";
import Select from "react-select";
import AddEvent from "./AddEvent";
import {Button, Colors} from "@blueprintjs/core";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);


const MainStyled = styled.div`
  display: flex;
  padding: 0 150px 0 150px;


  @media (min-width: 320px) and (max-width: 481px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
  }
`;

const LeftSide = styled.div`
  width: 85%;
  
  @media (min-width: 320px) and (max-width: 481px) {
   width: 100%;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  margin: 75px 0 75px 15px;

  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    margin: 95px 0 75px 15px;
  }

  @media (min-width: 320px) and (max-width: 481px) {
    width: 100%;
    margin: 0 0 25px 0;
  }
`;

const SelectStyled = styled(Select) `
  margin: 50px 15px 0 15px;

  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    width: 200px;
  }
  
  @media (min-width: 320px) and (max-width: 481px) {
    margin: 0 25px 0 25px;
  }

`;

const StyledCalendar = styled(Calendar)`
  /* play with the inspector in the browser to see what things are called and how best to interact with them. Have fun */
  .rbc-month-view {
    height: 90vh;
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
    color: white;
    font-size: 24px;
    margin: 15px;
  }

  .rbc-header {
    font-family: "Lato", sans-serif;
    padding: 15px;
    font-weight: 300;
    color: white;
  }

  .rbc-btn-group button {
    color: white;
  }

  .rbc-btn-group .rbc-active {
    color: #242943;
  }

  .rbc-time-header {
    background-color: #242943;
  }

  .rbc-time-header .rbc-today {
    color: #242943;
    font-weight: 550;
  } 

  .rbc-time-view {
    background-color: white;
  }

  .rbc-calendar .rbc-agenda-view {
    color: white;
    margin: 10px;
  }

  .rbc-agenda-view .rbc-agenda-empty {
    color: white;
    margin: 10px;
  }

  .rbc-header {
      display: flex; 
      justify-content: center;
    }

  @media (min-width: 320px) and (max-width: 481px) {
    .rbc-month-view {
      height: 80vh;
    }


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
      })

  onInputChange = (inputValue, { action }) => {
    this.setState({ participants: inputValue });
  };

  addOption = (name, option) => {
    this.setState({ [`${name}s`]: [...this.state[`${name}s`], option] });
  };

  toggleForm = () => {
    this.loadState();
    const { familyEvents } = this.props;
    if (familyEvents > this.state.events) {
      this.setState({ events: this.mapToCalendar(familyEvents) });
    }
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
    events = this.mapToCalendar(familyEvents);
    this.setState({ events });
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
        userID
      } = event;

      let startTime = new Date(moment(eventStart, "YYYYMMDD hh:mm a"));
      let endTime = new Date(moment(eventEnd, "YYYYMMDD hh:mm a"));
      return {
        title: scheduledEvent_name,
        start: startTime,
        end: endTime,
        participants: `${userName.join(", ")}`,
        particulars: `${eventType_name} event at ${location_name} ${address}`,
        userID
        //allDay:true
      };
    })
    .filter(event=>{
      if(!this.state.participants.length){
        return true
      }
      let currentFamilyIDs = this.state.participants.map(person => person.value)
      return currentFamilyIDs.some(id => event.userID.includes(id))
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
      this.setState({ events: [...this.state.events, addedEvent] });
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
    return (
      <MainStyled>
        <LeftSide>
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
        </LeftSide>

        <RightSide>
            <div>
              {this.state.showForm ? (
                <AddEvent
                  toggleForm={this.toggleForm}
                  addToCalendar={this.addToCalendar}
                  state={this.state}
                  addOption={this.addOption}
                  familyID={this.props.familyID}
                  isAdmin={this.props.profile.isAdmin}
                  family={this.props.family}
                  loadGlobal={this.props.loadState}
                  history={this.props.history}
                />
              ) : (
                <Button 
                  onmou
                  onClick={this.toggleForm}
                  style={{color: Colors.WHITE, 
                          background: "#242943", 
                          border: "1px solid #ffffff", 
                          width:"150px", 
                          height: "50px",
                          margin: "15px",}}
                  text="NEW EVENT">
                </Button>
              )}
            </div>

          <SelectStyled
                placeholder="Family Members"
                name="participants"
                defaultValue={this.state.participants}
                isMulti
                options={this.participantToOptions(this.props.family)}
                value={this.state.participants}
                onChange={this.onInputChange}
              />
          </RightSide>
      </MainStyled>
    );
  }
}

export default CalendarComponent;
