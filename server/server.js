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
  res.send("Family Tabs Api");
});

server.use(
  "/event",
  routeMaker(
    "scheduledEvent",
    [
      "scheduledEvent_name",
      "timeDate",
      "eventTypeID",
      "locationID",
      "familyID"
    ],
    db,
    "scheduled event"
  )
);
server.use(
  "/profile",
  routeMaker(
    "user",
    ["phone", "familyID", "userName", "email", "isAdmin"],
    db,
    "profile"
  )
);
server.use("/family", routeMaker("family", ["family_name"], db, "family"));

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
getState(server, db);
paymentApi(server);

module.exports = server;
