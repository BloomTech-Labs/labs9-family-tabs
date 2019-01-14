const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://family-tabs.netlify.com/'
  : 'http://localhost:8080';

module.exports = PAYMENT_SERVER_URL;