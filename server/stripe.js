

const configureStripe = require('stripe');

const stripe = configureStripe(process.env.STRIPE_SECRET_KEY);

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  }
  
  const paymentApi = app => {
    app.get('/stripe', (req, res) => {
      res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
    });
  
    app.post('/stripe', (req, res) => {
      stripe.charges.create(req.body, postStripeCharge(res));
    });
  
    return app;
  };
  
  module.exports = paymentApi;