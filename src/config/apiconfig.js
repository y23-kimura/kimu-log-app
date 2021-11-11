// read config file
require("dotenv").config();
module.exports = {
  config: {
    port: process.env.EXPRESS_PORT,
  },
};
