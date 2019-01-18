exports.up = function(knex, Promise) {
    return knex.schema.table('family', tbl => {
        tbl.boolean('isSubscribed').notNull().defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('family', tbl => {
        tbl.dropColumn('isSubscribed');
    });
};