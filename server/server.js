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
  db("user")
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



server.post("/create event", async (req, res) => {
  const { familyID, eventTypeID, locationID, userID, location_name, address } = req.body;
  if (!eventTypeID, location_name, address) {
    
    res.status(400).json({ error:'Please Provide a Event Description and Location Information'});
  }


  // try {
  //   const familyEvents = await db("family")
  //     .join("eventWithUsers", function() {
  //       this.on("family.id", "=", "eventWithUsers.familyID")
  //         .onIn("family.id", id)
  //         .onIn("eventWithUsers.isArchived", 0);
  //     })
  //      .join("user", "eventWithUsers.userID", "=", "user.id")
  //     .join(
  //       "scheduledEvent",
  //       "eventWithUsers.scheduledEventID",
  //       "=",
  //       "scheduledEvent.id"
  //     )
  //     .join("location", "scheduledEvent.locationID", "=", "location.id")
  //     .join("eventType", "scheduledEvent.eventTypeID", "=", "eventType.id")
  //     .select(
  //       "family.family_name",
  //       "user.userName",
  //       "scheduledEvent.scheduledEvent_name",
  //       "scheduledEvent.timeDate",
  //       'scheduledEvent.id',
  //       "location.location_name",
  //       "location.address",
  //       "eventType.eventType_name"
  //     );
    
  //   return res.status(200).json(familyEvents);
  // } catch (err) {
  //   res.status(500).json({ err: "broke" });
  // }
});
module.exports = server;
