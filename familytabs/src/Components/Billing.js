import React, { Component } from 'react'
import BillingCard from './BillingCard';
import { Button } from "@blueprintjs/core";
import ButtonStyles from './ButtonStyles';


export default class Billing extends Component {
  render() {
    return (
    <div BillingPageWrapper>
      <div>
        <h1>I am the Billing page</h1>
      </div>
      <BillingCard />
      <ButtonStyles text="Test Button" />
      </div>
    )
  }
}
