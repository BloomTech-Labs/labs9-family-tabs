import React, { Component } from 'react'
import BillingCard from './BillingCard';
import styled from "styled-components";

const Title = styled.h1`
  margin: 0 0 0 0;
  display: flex;
  justify-content: center;
  color: #ffffff;
  font-size: 60px;
  padding:0;
  font-weight: 700;


`;

const BottomBorder = styled.div`
  border-bottom: 2px solid #D4B36E;
  height: 20px;
  width: 100%;
  margin: 0px 0px 50px 0px;
 

`;
const TitleContent = styled.p `
   display: flex;
 
    color: #ffffff;
    font-size: 16px;
    padding-left: 5px;
    color: #3985ac;
    width: 20%;
    margin: 0px 0px 10px 125px; 
  

  

`;

const BillingWrapper=styled.div `



`;

const BillingTitle = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;



`;

const CardContainer = styled.div `
 
    display: flex;
    justify-content: center;
`;



export default class Billing extends Component {
  render() {
    return (
    <BillingWrapper>
        <BillingTitle>
        <TitleContent>upgrade to a premium account</TitleContent>
        <Title>Billing</Title>
        <BottomBorder></BottomBorder>
        </BillingTitle>
      <CardContainer>
      <BillingCard />

      </CardContainer>
      </BillingWrapper>
    )
  }
}
