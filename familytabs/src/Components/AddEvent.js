import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import CreatableAdvanced from './CreatableAdvanced'
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
    locationID: null
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
      locationID
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
      eventStart,
      eventEnd,
      eventTypeID,
      locationID,
      familyID: this.props.familyID,
      createdByAdmin: this.props.isAdmin ? 1 : 0
    };
    await this.props.addToCalendar(newEvent)
    this.setState({
      scheduledEvent_name: "",
      eventStart: null,
      eventEnd: null,
      eventTypeID: null,
      locationID: null
    });
  };

  render() {
    const { locations, eventTypes } = this.props.state;
    const {
      scheduledEvent_name,
      eventTypeID,
      eventStart,
      locationID,
      eventEnd
    } = this.state;
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
            dateFormat="yyyyMMdd h:mm"
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
            dateFormat="yyyyMMdd h:mm"
            startDate={eventStart}
            endDate={eventEnd}
            onChange={this.setEnd}
          />
          <CreatableAdvanced
          name='eventType'
          options = {eventTypes}
          value = {eventTypeID}
          setValue= {this.setEventID}
          addOption={this.props.addOption}
          familyID={this.props.familyID}
          ></CreatableAdvanced>
          <CreatableAdvanced
          name='location'
          options = {locations}
          value = {locationID}
          setValue= {this.setLocationID}
          addOption={this.props.addOption}
          familyID={this.props.familyID}
          ></CreatableAdvanced>

          {/* <select onChange={this.inputHandler} name="Location">
            {locations.map(x => (
              <option value={x.id} key={x.id}>
                {x.location_name}
              </option>
            ))}
          </select>

          <select name="Event Type" onChange={this.props.inputHandler}>
            {eventTypes.map(x => (
              <option value={x.id} key={x.id}>
                {x.eventType_name}
              </option>
            ))}
          </select> */}

          <button type='submit'>Add Event</button>
          <button onClick={this.props.toggleForm}>Exit</button>
        </form>
      </StyledFormWrapper>
    );
  }
}
export default AddEvent;
