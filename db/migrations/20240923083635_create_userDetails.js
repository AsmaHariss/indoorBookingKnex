exports.up = function(knex) {
    return knex.schema.hasTable('userDetails').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('userDetails', (table) => {
          table.increments('id');
          table.string('first_name').notNullable();
          table.string('last_name').notNullable();
          table.string('phone').notNullable();
          table.string('email').notNullable();
          table.string('password').notNullable();
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('userDetails');
  };
  