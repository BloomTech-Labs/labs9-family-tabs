const moment = require("moment")

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scheduledEvent').truncate()
    .then(function () {
      // Inserts seed entries
      let date1 = moment('2019-01-22').format('YYYYMMDD')
      let date2 = moment('2019-01-23').format('YYYYMMDD')
      let date3 = moment('2019-01-24').format('YYYYMMDD')

      return knex('scheduledEvent').insert([
        {scheduledEvent_name: 'Game: Tigers vs. Penguins', timeDate: date1, eventTypeID: 1, locationID: 1, familyID: 1},
        {scheduledEvent_name: 'Olympics Rehersal', timeDate: date2, eventTypeID: 2, locationID: 2, familyID: 2},
        {scheduledEvent_name: 'Game: Tigers vs. Dingers', timeDate: date3, eventTypeID: 1, locationID: 1, familyID: 1}
      ]);
    });
};
