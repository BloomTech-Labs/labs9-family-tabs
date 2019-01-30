import React from "react";
import styled from "styled-components";
import moment from 'moment';

const Card = styled.div`
  border: 2px solid lightgrey;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  background: #ffffff;
  font-family: "Roboto", sans-serif;
  margin: 28px;
`;

const Header = styled.div`
  font-family: "Roboto", sans-serif;
  color: black;
  font-size: 18px;
  width: 100%;
  height: 60px;
  justify-content: center;
  padding-top: 10px;
  display: flex;
`;

const Info = styled.div`
  font-family: "Lato", sans-serif;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;
`;

class EventCard extends React.Component {
render(){
  return (
    <Card>
      <Header>Event: {this.props.eventData.scheduledEvent_name}</Header>
      <Info>
        <p>Event Start: { moment(this.props.eventData.eventStart, "YYYYMMDD hh:mm a").format('LLLL')}</p>
        <p>Event End: {moment(this.props.eventData.eventEnd, "YYYYMMDD hh:mm a").format('LLLL')}</p>
        <p>Created By: {this.props.family.find(person => person.id === this.props.eventData.createdBy).userName}</p>
        
      </Info>
      {/* {this.props.isAdmin ? <button>Edit</button>: ''} */}
      {(this.props.pending && this.props.isAdmin) ? (
        <>
          <button onClick={this.props.approveClick} id={this.props.eventData.id}>
            Approve
          </button>
          <button onClick={this.props.declineClick} id={this.props.eventData.id}>
            Decline
          </button>
        </>
      ) : (
        ""
      )}
    </Card>
  );
} 
}
export default EventCard;
