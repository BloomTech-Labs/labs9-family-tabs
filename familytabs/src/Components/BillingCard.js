import React from 'react';
import styled from "styled-components";
import Checkout from './Checkout';
import { Card, Elevation } from "@blueprintjs/core";


const BillingWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const CardStyle = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 50%;
    height: 65%;
    /* border: 2px solid red; */
    border-radius: 25px;
    background: #BFBFBF;
    margin-bottom: 20px
    h2 {
        font-weight: bold;
        color: #242943;
        margin: 25px;
    }
    p {
        color: #242943
    }
`;


function BillingCard(props) {
    
    return (
    <div>
    <BillingWrapper>
    <CardStyle interactive={true} elevation={Elevation.TWO}>
        <h2>Family Tabs - Premium</h2>
        <p>    Family Tabs free accounts automatically offers a single parent account with up to
               three children.  For only 9.99 a month the Premium account includes three admins
               and and unlimited amount of children accounts.  Your information is always safe with
               us, and will never be sold to third parties under any circumstances.  With Family Tabs
               we make it easy to keep tabs on the whole family!
               </p>
    </CardStyle>
    {/* <Card >
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
       </Card > */}
   
      <div>
      <p className="App-intro"> 
    </p>
    </div>
    </BillingWrapper>
    <Checkout
        name={'Family Tabs'}
        description={'Monthy Subscription'}
        amount={9.99} />
    </div>
    );
}

export default BillingCard;