exports.up = function(knex) {
  return knex.schema.hasTable('booking').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('booking', (table) => {
        table.increments('id'); // Primary key
        table.string('court_name').notNullable(); 
        table.string('sport_name').notNullable();
        table.timestamp('start_time').notNullable(); 
        table.timestamp('end_time').notNullable(); 
        table.integer('user_id').notNullable(); 
        table.integer('court_id').notNullable(); 
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('booking');
};
