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

server.get("/", (req, res) => {
  db("scheduledEvent")
    .then(users => {
      res.status(201).json({ users });
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to get user from user table." });
    });
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
        'scheduledEvent.id',
        "location.location_name",
        "location.address",
        "eventType.eventType_name"
      );
    
    return res.status(200).json(familyEvents);
  } catch (err) {
    res.status(500).json({ err: "broke" });
  }
});



server.post("/createevent", async (req, res) => {
  const { familyID, eventTypeID, locationID, userID, timeDate, scheduledEvent_name } = req.body;
  if (!scheduledEvent_name && !eventTypeID && !timeDate ) {
    res.status(400).json({ error:'Please Provide a Event Description and Location Information'});
  }
  try{
    let id = await db("scheduledEvent").insert(req.body)
    id = id[0]
    const event = await db('scheduledEvent').where({id})
    res.status(201).json(event)
  }catch(err){
    res.status(500).json({error: 'could not add event'})
  }
});

server.put("/changeevent/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const count = await db('scheduledEvent')
      .where({ id })
      .update(body);
    if (!count) {
      res.status(400).json({error: 'Event was not successfully changed.'});
    }
    const eventUpdated = await db('scheduledEvent').where({ id });
    res.status(201).json({ updated: eventUpdated });
  } catch (err) {
    res.status(500).json({error: 'Event could not be edited.'});
  }
});

module.exports = server;
