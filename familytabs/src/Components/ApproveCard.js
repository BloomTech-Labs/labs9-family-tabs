import React from 'react'
import styled from "styled-components";
import {Link} from 'react-router-dom'; 


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

function ApproveCard(props) {
    
      return (
        <div className="ParentHomepage">
           
           <Card >
             <Header>Event: {props.approveddata.scheduledEvent_name}</Header>
             <Info>
             <p>Event Start: {props.approveddata.eventStart}</p>
             <p>Event End: {props.approveddata.eventEnd}</p>
             <p>Created By: {props.approveddata.userName}</p>
             </Info>
         
         </Card >
        </div>
      );
  }
  
  
 
  export default ApproveCard;