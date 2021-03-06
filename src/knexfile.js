// Update with your config settings.
const { config } = require("./config/dbconfig");

console.log(config);
module.exports = {
  client: "pg",
  connection: config.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
};
