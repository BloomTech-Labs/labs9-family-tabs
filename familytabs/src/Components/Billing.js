import React, { Component } from 'react'
import BillingCard from './BillingCard';
import styled from "styled-components";

const StyledMain = styled.div`
  padding: 0 150px 0 150px;
  display: flex;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 481px) {

  }
`;

const StyledTop = styled.div`
  color: white;
  font-size: 64px;
  margin: 0 0 25px 0;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 60px;
    font-weight: 700;
`;

const BottomBorder = styled.div`
    border-bottom: 2px solid #D4B36E;
    height: 20px;
    width: 100%;
    margin: 0 0 50px 0;
`;

export default class Billing extends Component {
  render() {
    return (
      <StyledMain>

        <StyledTop>
            <Title>Billing</Title>
            <BottomBorder></BottomBorder>
        </StyledTop>
 
        <StyledBottom>
            <div BillingPageWrapper>
              <BillingCard />
            </div>
        </StyledBottom>

      </StyledMain>
    )
  }
}
