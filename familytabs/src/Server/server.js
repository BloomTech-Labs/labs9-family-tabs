const cors = require('cors');
const bodyParser = require('body-parser');

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(null, false)
};

// const corsOptions = {
//   origin: 'https://family-tabs.netlify.com/',
//   credentials: true
// };

const configureServer = app => {
  app.use(cors(corsOptions));

  app.use(bodyParser.json());
};

module.exports = configureServer;



