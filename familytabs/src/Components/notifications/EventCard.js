import React from "react";
import styled from "styled-components";
import moment from "moment";

// const Card = styled.div`
//   border: 2px solid lightgrey;
//   width: 400px;
//   height: 200px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   line-height: 2;
//   background: #ffffff;
//   font-family: "Roboto", sans-serif;
//   margin: 28px;
// `;

// const Header = styled.div`
//   font-family: "Roboto", sans-serif;
//   color: black;
//   font-size: 18px;
//   width: 100%;
//   height: 60px;
//   justify-content: center;
//   padding-top: 10px;
//   display: flex;
// `;

// const Info = styled.div`
//   font-family: "Lato", sans-serif;
//   padding-left: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding-bottom: 10px;
// `;

const Card = styled.div`
  border: 2px solid lightgrey;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  background: #68659E;
  margin: 28px auto;
  @media (max-width:450px){
    width:100%;
  }
`;

const Header = styled.div`
  color: #ffffff;
  font-size: 22px;
  font-weight: 500;
  width: 100%;
  height: 60px;
  justify-content: center;
  padding-top: 10px;
  display: flex;
`;

const Info = styled.div`
  width:100%;
  font-size:15px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;
  color: #ffffff;
  p{
    width:100%;
    text-align:center;
  }
`;

const ApproveButton = styled.button `
    margin: 10px 0px 20px 10px;
    color: white;
    background: #68659E;
    border: 2px solid #ffffff; 
    /* padding: 15px 50px 15px 50px; */
    width: 100px; 
    height: 25px;
    margin-left: 5px;
    
    :hover {
      border-color: #f3845a;
      color: #f3845a;
      cursor: pointer;
    }
`;

const DeclineButton = styled.button `
    margin: 10px 0px 20px 10px;
    color: white;
    background: #68659E;
    border: 2px solid #ffffff; 
    /* padding: 15px 50px 15px 50px; */
    width: 100px; 
    height: 25px;
    margin-left: 5px;
    
    :hover {
      border-color: #4ec49d;
      color: #4ec49d;
      cursor: pointer;
    }
`;

const ButtonBox = styled.div`
width:100%;
  display:flex;
  justify-content: space-evenly;
`

class EventCard extends React.Component {
  render() {
    return (
      <Card>
        <Header>EVENT: {this.props.eventData.scheduledEvent_name}</Header>
        <Info>
          <p>
            EVENT START:{" "}
            {moment(this.props.eventData.eventStart, "YYYYMMDD hh:mm a").format(
              "LLLL"
            )}
          </p>
          <p>
            EVENT END:{" "}
            {moment(this.props.eventData.eventEnd, "YYYYMMDD hh:mm a").format(
              "LLLL"
            )}
          </p>
          <p>
            CREATED BY:{" "}
            {
              this.props.family.find(
                person => person.id === this.props.eventData.createdBy
              ).userName
            }
          </p>
        </Info>
        {/* this ternary checks to see if this event card was created by one of the pending events. It also makes sure that the user is an admin. 
        If both of those tests our passed, the buttons will render. If not, the buttons will not display*/}
        {this.props.pending && this.props.isAdmin ? ( 
          <ButtonBox>
            <ApproveButton
              onClick={this.props.approveClick}
              id={this.props.eventData.id}
            >
              APPROVE
            </ApproveButton>
            <DeclineButton
              onClick={this.props.toggleForm}
              id={this.props.eventData.id}
            >
              DECLINE
            </DeclineButton>
          </ButtonBox>
         )
        // everything before the colon will load if our tests pass. everything after the colon will load if they don't
        : (
          ""
        )}
      </Card>
    );
  }
}
export default EventCard;
