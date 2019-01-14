// const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
//   ? 'pk_test_UBJvxpDnV4c5JmBSSYEX3cKu'
//   : 'pk_test_UBJvxpDnV4c5JmBSSYEX3cKu';

// export default STRIPE_PUBLISHABLE;

const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_XL29DBr3Kcqy9ws5ETOFqaZe'
    : 'sk_test_XL29DBr3Kcqy9ws5ETOFqaZe';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;