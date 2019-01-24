import React from 'react'
import styled from "styled-components";


const Card = styled.div`
    border: 2px solid lightgrey;
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    line-height: 2;
    background: #ffffff;
    font-family: 'Roboto', sans-serif;
    margin: 28px;
`;

const Header = styled.div` 
/* border: 1px solid red; */
font-family: 'Fredoka One';
   color: black;
   font-size: 18px;
   width: 100%;
   height: 60px;
  justify-content: center;
   padding-top: 10px;
   display: flex;
`;

const Info = styled.div `
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    padding-bottom: 10px;
`;

function NotificationCard(props) {
    
      return (
        <div className="ParentHomepage">
           
           <Card >
             <Header>Event: {props.pendingdata.scheduledEvent_name}</Header>
             <Info>
             <p>Event Start: {props.pendingdata.eventStart}</p>
             <p>Event End: {props.pendingdata.eventEnd}</p>
             <p>Created By: {props.pendingdata.userName}</p>
             </Info>
         </Card >
        </div>
      );
  }
  
  
 
  export default NotificationCard;