import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import styled from 'styled-components'

import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = Calendar.momentLocalizer(moment);

const StyledCalendar = styled(Calendar)`


  /* play with the inspector in the browser to see what things are called and how best to interact with them. Have fun */
  .rbc-month-view {
    border-radius: 21px;
    overflow: hidden;
    height: 800px;
    border-color:red;
  }
  .rbc-day-bg{
    background: white;
    :nth-child(1){
    background: white;
  }
  }
  .rbc-date-cell{
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
`

class CalendarComponent extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

  render() {
    return (
      <div className="CalendarComponent">
        <StyledCalendar 
          day={1}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
        />
      </div>
    );
  }
}

export default CalendarComponent;