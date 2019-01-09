exports.up = function(knex, Promise) {
    return knex.schema.createTable('scheduledEvent', scheduledEvent => {
        scheduledEvent
          .increments()
          .notNullable()

        scheduledEvent
          .string('scheduledEvent_name', 128)
          .notNullable()

          scheduledEvent
          .string('timeDate', 128)
          .notNullable()

        scheduledEvent
          .integer('familyID')
          .references('family.id')
          .notNullable()

          scheduledEvent
          .integer('eventTypeID')
          .references('eventType.id')
          .notNullable()

          scheduledEvent
          .integer('locationID')
          .references('location.id')
          .notNullable()
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('scheduledEvent');
};
