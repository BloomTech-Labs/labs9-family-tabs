import React from 'react';
import styled from "styled-components";
import Checkout from './Checkout';

const Card = styled.div`
    border: 2px solid lightgrey;
    width: 380px;
    display: flex;
    flex-direction: column;
    /* align-items: flex-start;   */
    line-height: 2;
    background: #ffffff;
    font-family: 'Roboto', sans-serif;
    /* margin: 28px; */
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


function BillingCard(props) {
    
    return (
    <div className= "BillingWrapper">
    <Card >
         <Header>Billing</Header>
         
         <Header>Subscription Info</Header>
           <Info>
           <p>Family Tabs free accounts automatically offers a single parent account with up to
               three children.  For only 9.99 a month the Premium account includes three admins
               and and unlimited amount of children accounts.  Your information is always safe with
               us, and will never be sold to third parties under any circumstances.  With Family Tabs
               we make it easy to keep tabs on the whole family!
           </p>
           </Info>
       </Card >
   
      <div>
      <p className="App-intro">
      <Checkout
        name={'The Road to learn React'}
        description={'Only the Book'}
        amount={1}
      />
    </p>
    </div>
    </div>
    );
}

export default BillingCard;