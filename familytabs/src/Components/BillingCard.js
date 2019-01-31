import React from 'react';
import styled from "styled-components";
import Checkout from './Checkout';




const BillingWrapper = styled.div`
    color: #ffffff;
    display: flex;
    flex-direction: column;
 
    width: 50%;

  

`;
const Title = styled.div `
 text-align: left;
 font-size: 20px;
 margin: 30px 0px 30px 0px;

`;
const Content = styled.p `
   
    text-align: left;
    margin: 30px 0px 60px 0px;

`;
const ButtonWrapper = styled.div `
    width: 50%;
    margin-left: -16%;
    

`;


function BillingCard(props) {
    
    return (

    <BillingWrapper>
        <Title>
            <h2>FAMILY TABS PREMIUM</h2>
        </Title>

        <Content>
               FOR ONLY $9.99 A MONTH THE PREMIUM ACCOUNT INCLUDES THREE ADMINS AND AN UNLIMITED AMOUNT OF CHILDREN ACCOUNTS. YOUR INFORMATION IS ALWAYS SAFE WITH US, AND WILL NEVER BE SOLD TO THIRD PARTIES. WITH FAMILY TABS PREMIUM. IT GETS EVEN EASIER TO KEEP TABS ON THE WHOLE FAMILY! 
        </Content>

    <div>
      <p className="App-intro"> 
    </p>
    </div>
    <ButtonWrapper>


    <Checkout
        name={'Family Tabs'}
        description={'Monthy Subscription'}
        amount={9.99} />
    </ButtonWrapper>
        </BillingWrapper>

    );
}

export default BillingCard;