const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_UBJvxpDnV4c5JmBSSYEX3cKu'
  : 'pk_test_UBJvxpDnV4c5JmBSSYEX3cKu';

export default STRIPE_PUBLISHABLE;