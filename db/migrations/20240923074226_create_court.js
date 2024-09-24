exports.up = function(knex) {
    return knex.schema.hasTable('courts').then((exists) => {
      if (!exists) {
        return knex.schema.createTable('courts', (table) => {
          table.increments('id');
          table.string('court_name').notNullable();
          table.string('sport_name').notNullable();
          table.string('location').notNullable(); // Note: there is a typo here ("locatiob")
        });
      }
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('courts');
  };
  