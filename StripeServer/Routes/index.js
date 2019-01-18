
const paymentApi = require('./payments');

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;