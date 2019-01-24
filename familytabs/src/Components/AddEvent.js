import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
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
export default function AddEvent(props) {
  const {eventEnd, eventStart, locations, locationID,eventTypes,eventType_id, scheduledEvent_name} = props.state
  console.log(eventTypes)
  return (
    <StyledFormWrapper>
      <form onSubmit={props.addEventHandler}>
        <input
          type="text"
          name="scheduledEvent_name"
          onChange={props.inputHandler}
          placeholder="Event Title"
          value={scheduledEvent_name}
        />

        <DatePicker
          name="eventStart"
          dateFormat="MMMM d, yyyy h:mm a"
          selected={eventStart}
          selectsStart
          showTimeSelect
          placeholderText="Event start"
          value={eventStart}
          startDate={eventStart}
          endDate={eventEnd}
          onChange={props.setStart}
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
          dateFormat="MMMM d, yyyy h:mm a"
          startDate={eventStart}
          endDate={eventEnd}
          onChange={props.setEnd}
        />

<select onChange={props.inputHandler}  name="Location">
{locations.map(x => <option value={x.id} key={x.id}>{x.location_name}</option>)}
{/* <option value='new' >New Location</option> */}
</select>

<select name="Event Type" onChange={props.inputHandler} >

{eventTypes.map(x => <option value={x.id} key={x.id}>{x.eventType_name}</option>)}
{/* <option value='new' >New Event Type</option> */}
</select>

        <button>Add Event</button>
        <button onClick={props.toggleForm}>Exit</button>
      </form>
    </StyledFormWrapper>
  );
}
