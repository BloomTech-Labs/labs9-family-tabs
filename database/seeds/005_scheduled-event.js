
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scheduledEvent').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('scheduledEvent').insert([
        {scheduledEvent_name: 'Game: Tigers vs. Penguins', timeDate: 'February 22, 2019', eventTypeID: 1, locationID: 1, familyID: 1},
        {scheduledEvent_name: 'Olympics Rehersal', timeDate: 'February 14, 2019', eventTypeID: 2, locationID: 2, familyID: 2},
      ]);
    });
};
