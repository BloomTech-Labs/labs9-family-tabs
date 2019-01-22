const express = require("express");
const server = express();

const knex = require("knex");

const dbEngine = process.env.DB || "development";
const dbConfig = require("../knexfile")[dbEngine];
const db = knex(dbConfig);

const getState = require('./stateCalls')
const paymentApi = require('./stripe')
const middleware = require('./middleware')
const routeMaker = require('./routeMaker')

middleware(server)
const client = require("twilio")(process.env.TWILO_ACCOUNT_SID, process.env.TWILO_ACCOUNT_SID);

const CronJob = require("cron").CronJob;
const axios = require("axios");
const moment = require("moment");

// ========= NODE-CRON =========//

//console.log("Before job instantiation");
const job = new CronJob("* */10 * * * *", function() {
  const d = new Date();

  //console.log("Every Tenth Second:", d);

  axios
    .get(process.env.SERVER_API_URL)
    .then(events => {
      //  console.log(events.data.users);
      events.data.users.map(event => {
        let today = moment();
        let eventDate = moment(event.timeDate, "YYYYMMDD");
        let eventReminder = {
          title: event.scheduledEvent_name,
          start: event.timeDate,
          phone: "8133613402",
          body: "test of event notification system",
          allDay: true
        };

        //console.log("EVENT", event);

        if (eventDate.diff(today, "days") === 0 && event.dayAlert === 0) {
          axios
            .post(`${process.env.SERVER_API_URL}/text`, eventReminder)
            .then(resp => {
              console.log(resp);
            })
            .catch(err => {
              console.log(err);
            });

          let eventAlert = {
            dayAlert: true
          };

          axios
            .put(`${process.env.SERVER_API_URL}/changeevent/${event.id}`, eventAlert)
            .then(resp => {
              console.log("RUNNING", resp);
            })
            .catch(err => {
              console.log("RUNNING", err);
            });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});
//console.log("After job instantiation");
job.start();
// ========= TWILIO =========//

server.post("/text", (req, res) => {
  const { phone, title, start, body } = req.body;
  client.messages
    .create({
      body: `    Reminder that you have a ${title} starting on ${start}.\n\n Note: ${body} `,
      from: "+18338536427",
      to: `+1${phone}`
    })
    .then(message => console.log(message.sid))
    .done();
});

// ========= SERVER =========//

server.get("/", (req, res) => {
  res.send('Family Tabs Api')
});

server.use('/event', routeMaker('scheduledEvent', ['scheduledEvent_name', 'timeDate', 'eventTypeID', 'locationID','familyID'],db, 'scheduled event'))
server.use('/profile', routeMaker('user',['phone', 'familyID', 'userName', 'email','isAdmin'],db, 'profile' ))
server.use('/family', routeMaker('family', ['family_name'], db, 'family'))


getState(server,db)
paymentApi(server)

module.exports = server;
