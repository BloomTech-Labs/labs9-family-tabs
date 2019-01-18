const express = require('express');

// const SERVER_CONFIGS = require('../Constants/server');

const port = process.env.PORT || 8080

const configureServer = require('./server');
const configureRoutes = require('./Routes');


const app = express();

configureServer(app);
configureRoutes(app);

app.listen(port, error => {
  if (error) throw error;
  console.log(`server listening on ${port}`);
});

//

// require('dotenv').config();
// const server = require('./server/server');

// const port = process.env.PORT || 5000



// server.listen(port, () => {
//     console.log(`server listening on ${port}`)
// })