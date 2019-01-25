import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import CreatableAdvanced from './CreatableAdvanced'
import Select from 'react-select';
import moment from "moment";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";



const StyledFormWrapper = styled.div`
  height: 100vh;
  z-index: 3000;
  width: 100vw;
  background: #00000080;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    max-width: 600px;
    margin: 100px, auto;
    background: white;
    display: flex;
    flex-direction: column;
  }
`;

class AddEvent extends React.Component {
  state = {
    scheduledEvent_name: "",
    eventStart: null,
    eventEnd: null,
    eventTypeID: null,
    locationID: null,
    participants:[]
  };

  participantToOptions = options => options.map(option=> {return{ value:option.id, label: option.userName}})

  onInputChange = (inputValue, { action }) => {
     this.setState({ participants:inputValue });
  };
  setStart = e => {
    this.setState({ eventStart: e });
  };

  setEventID = id => {
    this.setState({ eventTypeID: id });
  };

  setLocationID = id => {
    this.setState({ locationID: id });
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
      eventTypeID,
      locationID,
      participants
    } = this.state;
    if (
      !scheduledEvent_name ||
      !eventStart ||
      !eventEnd
      || !eventTypeID ||!locationID
       
    ) {
      return;
    }
    let newEvent = {
      scheduledEvent_name,
      eventStart: moment(eventStart).format("YYYYMMDD hh:mm a"),
      eventEnd : moment(eventEnd).format("YYYYMMDD hh:mm a"),
      eventTypeID,
      locationID,
      familyID: this.props.familyID,
      createdByAdmin: this.props.isAdmin ? 1 : 0
    };
    try{
      let eventResponse = await this.props.addToCalendar(newEvent)
      console.log(eventResponse)
    let {id, familyID} =eventResponse
     await participants.forEach(async x => await axios.post(`${process.env.REACT_APP_API_URL}/eventwithusers/create`, {familyID, userID:x.value, scheduledEventID:id}))
    this.setState({
      scheduledEvent_name: "",
      eventStart: null,
      eventEnd: null,
      eventTypeID: null,
      locationID: null
    });
    this.props.loadGlobal(familyID)
    this.props.toggleForm()
    }catch(err){
      console.log(err)
    }
    
  };
 
  render() {
    const { locations, eventTypes } = this.props.state;
    const {
      scheduledEvent_name,
      eventTypeID,
      eventStart,
      locationID,
      eventEnd,
      participants
    } = this.state;
    console.log(participants)
    return (
      <StyledFormWrapper>
        <form onSubmit={this.addEventHandler}>
          <input
            type="text"
            name="scheduledEvent_name"
            onChange={this.inputHandler}
            placeholder="Event Title"
            value={scheduledEvent_name}
          />

          <DatePicker
            name="eventStart"
            dateFormat="MMMM d, yyyy h:mm aa"
            selected={eventStart}
            selectsStart
            showTimeSelect
            placeholderText="Event start"
            value={eventStart}
            startDate={eventStart}
            endDate={eventEnd}
            onChange={this.setStart}
            timeFormat="HH:mm"
            popperClassName="popper"
            popperPlacement="left-start"
          />

          <DatePicker
            name="eventEnd"
            value={eventEnd}
            selected={eventEnd}
            selectsEnd
            showTimeSelect
            placeholderText="Event end"
            popperPlacement="right-start"
            popperClassName="popper"
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            startDate={eventStart}
            endDate={eventEnd}
            onChange={this.setEnd}
          />
          <CreatableAdvanced
          name='eventType'
          placeholder='Event type'
          options = {eventTypes}
          value = {eventTypeID}
          setValue= {this.setEventID}
          addOption={this.props.addOption}
          familyID={this.props.familyID}
          ></CreatableAdvanced>

          <CreatableAdvanced
          name='location'
          placeholder='Location'
          options = {locations}
          value = {locationID}
          setValue= {this.setLocationID}
          addOption={this.props.addOption}
          familyID={this.props.familyID}
          ></CreatableAdvanced>




  <Select
  placeholder='Participants'
    name='participants'
    defaultValue={null}
    isMulti
    options={this.participantToOptions(this.props.participants)}
    value={this.state.participants}
    onChange={this.onInputChange}
  />



          <button type='submit'>Add Event</button>
          <button onClick={this.props.toggleForm}>Exit</button>
        </form>
      </StyledFormWrapper>
    );
  }
}
export default AddEvent;
