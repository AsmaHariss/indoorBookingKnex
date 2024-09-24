// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'knex-test',
      user:     'postgres',
      password: 'Admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

      tableName: 'knex_userDetails_migrations'
    }
  },

};
