const express = require("express");
const server = express();
server.use(express.json());

const knex = require("knex");

const dbEngine = process.env.DB || "development";
const dbConfig = require("../knexfile")[dbEngine];
const db = knex(dbConfig);

const cors = require("cors");
const corsOptions = {};
server.use(cors(corsOptions));

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountSid = 'ACb660a753d5eff40f7332f2f87fc97af6';
const authToken = 'e4d85e8d9cd5d82e9e040b1c2a534589';
const client = require('twilio')(accountSid, authToken);

const CronJob = require("cron").CronJob;
const axios = require("axios");
const moment = require("moment")


// ========= NODE-CRON =========//


console.log('Before job instantiation');
const job = new CronJob('* */10 * * * *', function() {
	const d = new Date();
  
  console.log('Every Tenth Second:', d);
  
  axios.get(`http://localhost:5000/`)
    .then(events => {
      //  console.log(events.data.users);
       events.data.users.map(event => {
         let today = moment();
         let eventDate = moment(event.timeDate, "YYYYMMDD");
         let eventReminder = {
          title: event.scheduledEvent_name,
          start: event.timeDate,
          phone: '8133613402',
          body: 'test of event notification system',
          allDay: true,
         }

         console.log("EVENT",event)


         if(eventDate.diff(today, 'days') === 0 && event.dayAlert === 0) {
           axios.post('http://localhost:5000/text', eventReminder)
            .then(resp => {
              console.log(resp)
            })
            .catch(err => {
              console.log(err)
            })
            
            let eventAlert = {
              dayAlert: true,
            }

            axios.put(`http://localhost:5000/changeevent/${event.id}`, eventAlert)
              .then(resp => {
                console.log("RUNNING",resp)
              })
              .catch(err => {
                console.log("RUNNING", err)
              })
         } 
       })
     })
    .catch(err => {
       console.log(err); 
    });
});
console.log('After job instantiation');
job.start();


// ========= TWILIO =========//

server.post("/text", (req, res) => {
  const {phone, title, start, body} = req.body;
      client.messages
        .create({
          body: `    Reminder that you have a ${title} starting on ${start}.\n\n Note: ${body} `,
          from: '+18338536427',
          to: `+1${phone}`
        })
        .then(message => console.log(message.sid))
        .done();
});


// ========= SERVER =========//

server.get("/", (req, res) => {
  db("scheduledEvent")
    .then(users => {
      res.status(201).json({ users });
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to get user from user table." });
    });
});

server.get("/familymembers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const familyMembers = await db("user")
      .where({ familyID: id })
      .join("family", "user.familyID", "=", "family.id")
      .select(
        "family.family_name",
        "user.id",
        "user.userName",
        "user.phone",
        "user.email",
        "user.isAdmin",
        'user.familyID'
      );
    if (!familyMembers.length) {
      return res.status(400).json({ err: "no family at that id" });
    }
    return res.status(200).json(familyMembers);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Failed to get users from user table." });
  }
});

server.get("/fulleventsbyfamily/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const familyEvents = await db("family")
      .join("eventWithUsers", function() {
        this.on("family.id", "=", "eventWithUsers.familyID")
          .onIn("family.id", id)
          .onIn("eventWithUsers.isArchived", 0);
      })
      .join("user", "eventWithUsers.userID", "=", "user.id")
      .join(
        "scheduledEvent",
        "eventWithUsers.scheduledEventID",
        "=",
        "scheduledEvent.id"
      )
      .join("location", "scheduledEvent.locationID", "=", "location.id")
      .join("eventType", "scheduledEvent.eventTypeID", "=", "eventType.id")
      .select(
        "family.family_name",
        "user.userName",
        "scheduledEvent.scheduledEvent_name",
        "scheduledEvent.timeDate",
        "scheduledEvent.id",
        "location.location_name",
        "location.address",
        "eventType.eventType_name"
      );
    if (!familyEvents.length) {
      return res.status(400).json({ err: "no events for family at that id" });
    }
    return res.status(200).json(familyEvents);
  } catch (err) {
    res.status(500).json({ err: "broke" });
  }
});

server.post("/createevent", async (req, res) => {
  const {
    familyID,
    eventTypeID,
    locationID,
    userID,
    timeDate,
    scheduledEvent_name
  } = req.body;
  if (!scheduledEvent_name && !eventTypeID && !timeDate) {
    res.status(400).json({
      error: "Please Provide a Event Description and Location Information"
    });
  }
  try {
    let id = await db("scheduledEvent").insert(req.body);
    id = id[0];
    const event = await db("scheduledEvent").where({ id });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "could not add event" });
  }
});

server.put("/changeevent/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const count = await db("scheduledEvent")
      .where({ id })
      .update(body);
    if (!count) {
      res.status(400).json({ error: "Event was not successfully changed." });
    }
    const eventUpdated = await db("scheduledEvent").where({ id });
    res.status(201).json({ updated: eventUpdated });
  } catch (err) {
    res.status(500).json({ error: "Event could not be edited." });
  }
});

server.get("/profile", async (req, res) => {
  try {
    const profiles = await db("user");
    return res.status(200).json(profiles);
  } catch (err) {
    return res.json(err);
  }
});

server.get("/family", async (req, res) => {
  try {
    const profiles = await db("family");
    return res.status(200).json(profiles);
  } catch (err) {
    return res.json(err);
  }
});

server.get("/profile/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const profile = await db("user")
      .where({ email })
      .join("family", "user.familyID", "=", "family.id")
      .select(
        "user.id",
        "user.email",
        "user.userName",
        "user.familyID",
        "user.phone",
        "user.isAdmin",
        "family.family_name"
      )
      .first();

    profile.email = profile.email.toLowerCase();
    if (!profile.userName) {
      res.status(200).json({ message: "no profile" });
    }
    return res.status(200).json(profile);
  } catch (err) {
    res.json({ err });
  }
});

server.post("/profile", async (req, res) => {
  const body = req.body;
  body.email = body.email.toLowerCase();
  try {
    let id = await db("user").insert(body);
    id = id[0]
    const newProfile = await db("user").join("family", "user.familyID", "family.id")
      .where('user.id', id )
      .select(
        "user.id",
        "user.email",
        "user.userName",
        "user.familyID",
        "user.phone",
        "user.isAdmin",
        "family.family_name"
      ).first()
    return res.status(201).json(newProfile);
  } catch (err) {
    res.json({ err });
  }
});

server.post("/family", async (req, res) => {
  const { body } = req;
  try {
    const id = await db("family").insert(body);
    return res.status(201).json({ id: id[0] });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = server;
