exports.up = function(knex) {
    return knex.schema.hasTable('courtAdmins').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('courtAdmins', (table) => {
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
    return knex.schema.dropTableIfExists('courtAdmins');
  };
  