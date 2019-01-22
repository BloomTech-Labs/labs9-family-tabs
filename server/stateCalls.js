const condenseUsers = arr =>{
    result = []
    for (let i = 0; i < arr.length; i++){
      let cur = arr[i]
      let resultIndex = result.findIndex(x => x.id === cur.id)
      if (resultIndex >= 0){
        result[resultIndex].userName.push(cur.userName)
      }
      else{
        result.push({...cur, userName: [cur.userName]})
      }
    }
    return result
  }

const getState = (app,db) => {

    app.post("/newlogin", async (req, res) => {
        const body = req.body;
        try {
          let id = await db("user").insert(body);
          id = id[0];
          const newProfile = await db("user")
            .join("family", "user.familyID", "family.id")
            .where("user.id", id)
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
          return res.status(201).json(newProfile);
        } catch (err) {
          res.json({ err });
        }
      });

  app.get("/profile/:email", async (req, res) => {
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

  app.get("/familymembers/:id", async (req, res) => {
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
          "user.familyID"
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

  app.get("/fulleventsbyfamily/:id", async (req, res) => {
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
      return res.status(200).json(condenseUsers(familyEvents));
    } catch (err) {
      res.status(500).json({ err: "broke" });
    }
  });
  return app;
};
module.exports = getState;
