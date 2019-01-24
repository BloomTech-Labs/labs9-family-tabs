const CronJob = require("cron").CronJob;
const axios = require("axios");
const moment = require("moment");

// ========= NODE-CRON =========//

//console.log("Before job instantiation");
const cron = () =>{
const job = new CronJob("*/10 * * * * *", function() {
 

  axios
    .get(`${process.env.SERVER_API_URL}/event`)
    .then(events => {
      //console.log(events.data);
      events.data.map(event => {
        let today = moment();
        let eventDate = moment(event.eventStart, "YYYYMMDD, h:mm a");
        let eventReminder = {
          title: event.scheduledEvent_name,
          start: event.eventStart,
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
            .put(`${process.env.SERVER_API_URL}/event/edit/${event.id}`, eventAlert)
            .then(resp => {
              console.log("RUNNING", resp);
            })
            .catch(err =>  {
              console.log("ERROR", err);
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
}

module.exports = cron