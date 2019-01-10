
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('eventWithUsers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('eventWithUsers').insert([
        {userID: 2, scheduledEventID: 1, familyID: 1},
        {userID: 3, scheduledEventID: 1, familyID: 1},
        {userID: 6, scheduledEventID: 2, familyID: 2},
      ]);
    });
};
