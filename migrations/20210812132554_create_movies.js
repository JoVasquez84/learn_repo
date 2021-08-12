
exports.up = function(knex) {
    return knex.schema.createTable('movies', table => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('genre');
        table.date('release_date');
        table.timestamps(true,true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies');
};
