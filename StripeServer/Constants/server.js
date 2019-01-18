const path = require('path');

const SERVER_PORT = process.env.PORT || 5000;

const SERVER_CONFIGS = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: SERVER_PORT,
};

module.exports = SERVER_CONFIGS;


