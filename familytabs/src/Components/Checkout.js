import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const CURRENCY = "USD";

const dollarToCent = amount => amount * 100;

const successPayment = data => {
  alert("Payment Successful");
};

const errorPayment = data => {
  alert("Payment Error" + data);
};

const onToken = (amount, description, familyID) => async token => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/stripe`, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: dollarToCent(amount)
    });
    successPayment();
    await axios.put(`${process.env.REACT_APP_API_URL}/family/edit/${familyID}`, {isSubscribed:true})
  } catch (err) {
    errorPayment();
  }
};

const Checkout = ({ name, description, amount, familyID }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={dollarToCent(amount)}
    token={onToken(amount, description, familyID)}
    currency={CURRENCY}
    stripeKey={process.env.REACT_APP_SPK}
  >
    <button>Upgrade Account</button>
  </StripeCheckout>
);

export default Checkout;
