
const paymentApi = require('../Routes/payments');

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;