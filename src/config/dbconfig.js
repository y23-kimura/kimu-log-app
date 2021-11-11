// read config file
require("dotenv").config();
module.exports = {
  config: {
    client: "pg",
    version: "7.2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 15432,
      database: process.env.DB_NAME || "tabelog",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
    },
  },
};
