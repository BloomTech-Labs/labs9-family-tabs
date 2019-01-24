const moment = require("moment")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scheduledEvent').truncate()
    .then(function () {
      // Inserts seed entries
      let date1 = moment('2019-01-25').format('YYYYMMDD, h:mm a')
      let date2 = moment('2019-01-26').format('YYYYMMDD, h:mm a')
      let date3 = moment('2019-01-27').format('YYYYMMDD, h:mm a')

      let date4 = moment('2019-01-25').format('YYYYMMDD, h:mm a')
      let date5 = moment('2019-01-26').format('YYYYMMDD, h:mm a')
      let date6 = moment('2019-01-27').format('YYYYMMDD, h:mm a')


      return knex('scheduledEvent').insert([
        {scheduledEvent_name: 'Game: Tigers vs. Penguins', eventStart: date1, eventEnd: date4, eventTypeID: 1, locationID: 1, familyID: 1},
        {scheduledEvent_name: 'Olympics Rehersal', eventStart: date2, eventEnd: date5, eventTypeID: 2, locationID: 2, familyID: 2},
        {scheduledEvent_name: 'Game: Tigers vs. Dingers', eventStart: date3, eventEnd: date6, eventTypeID: 1, locationID: 1, familyID: 1}
      ]);
    });
};
