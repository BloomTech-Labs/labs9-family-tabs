const express = require("express");
const server = express();

const knex = require("knex");

const dbEngine = process.env.DB || "development";
const dbConfig = require("../knexfile")[dbEngine];
const db = knex(dbConfig);

const getState = require("./stateCalls");
const paymentApi = require("./stripe");
const middleware = require("./middleware");
const routeMaker = require("./routeMaker");
const cron = require("./scheduler");

middleware(server);
const client = require("twilio")(
  process.env.TWILO_ACCOUNT_SID,
  process.env.TWILO_AUTH_TOKEN
);

cron();
// ========= TWILIO =========//

server.post("/text", (req, res) => {
  console.log("RUNNING TWILIO")
  const { phone, title, start, body } = req.body;
  client.messages
    .create({
      body: `Reminder that you have a ${title} starting on ${start}.\n\n Note: ${body} `,
      from: "+18338536427",
      to: `+1${phone}`
    })
    .then(message => console.log(message.sid))
    .done();
});

// ========= SERVER =========//

server.get("/", (req, res) => {
  res.send("Family Tabs Api");
});


server.use('/event', routeMaker('scheduledEvent', ['scheduledEvent_name', 'eventStart', 'eventEnd', 'familyID', 'eventTypeID', 'locationID', 'dayAlert', 'approved', 'declined', 'createdByAdmin'],db, 'scheduled event'))
server.use('/profile', routeMaker('user',['phone', 'familyID', 'userName', 'email', 'isAdmin', 'textCheckbox'],db, 'profile' ))
server.use('/family', routeMaker('family', ['family_name'], db, 'family'))
server.use('/location', routeMaker('location', ['location_name', 'familyID', 'address'], db, 'location'))
server.use('/eventtype', routeMaker('eventType', ['eventType_name', 'familyID' ], db, 'event type'))


getState(server, db);
paymentApi(server);

module.exports = server;
