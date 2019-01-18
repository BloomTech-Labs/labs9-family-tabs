exports.up = function(knex, Promise) {
    return knex.schema.table('scheduledEvent', tbl => {
        tbl.boolean('pendingApproval').notNull().defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('scheduledEvent', tbl => {
        tbl.dropColumn('pendingApproval');
    });
};