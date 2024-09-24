exports.up = function(knex) {
    return knex.schema.hasTable('registrations').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('registrations', (table) => {
          table.increments('id'); // Primary key
          table.string('court_name').notNullable(); 
          table.string('sport_name').notNullable();
          table.string('location').notNullable();
          table.integer('user_id').notNullable(); 
          table.string('status').notNullable();
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('registrations');
  };
  