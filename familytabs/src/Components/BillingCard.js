import React from "react";
//import styled from "styled-components";
import Checkout from "./Checkout";
import { StyledCard } from "./styled/components";

// const BillingWrapper = styled.div`
//   color: #ffffff;
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.div`
//   text-align: left;
//   font-size: 20px;
//   margin: 30px 0px 30px 0px;
// `;
// const Content = styled.p`
//   text-align: left;
//   margin: 30px 0px 60px 0px;
// `;
// const ButtonWrapper = styled.div`
//   width: 50%;
//   margin-left: -12%;
// `;

class BillingCard extends React.Component {
  subscribe=()=>{
      console.log('click')
  }
    render() {
    return (
      <StyledCard>
        {this.props.isSubscribed ? (
          <h2>Thanks for subscribing!</h2>
        ) : (
          <>
            <h2>FAMILY TABS PREMIUM</h2>

            <p>
              For only $9.99 a month, the premium account includes three admin
              accounts and an unlimited amount of child accounts.
            </p>
            <p>
              With Family Tabs Premium, it's even easier to keep tabs on the
              whole family.
            </p>

            <div className="button-box">
              <Checkout
              familyID={ this.props.familyID }
              loadState={this.props.loadState}
                name={"Family Tabs"}
                description={"Monthy Subscription"}
                amount={9.99}
              />
            </div>
          </>
        )}
      </StyledCard>
    );
  }
}
export default BillingCard;
