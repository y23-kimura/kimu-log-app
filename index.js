// entry point

// DB connection

const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    port: 15432,
    user: "postgres",
    password: "postgres",
    database: "tabelog",
  },
});

const table = "store";
const obj = {
  name: "yosukeSHOP",
  address: "世田谷区",
  tel: "000-000-00",
};
knex(table)
  .insert(obj)
  .catch((err) => {
    // sanitize known errors
    if (
      err.message.match("duplicate key value") ||
      err.message.match("UNIQUE constraint failed")
    )
      return Promise.reject(new Error("That username already exists"));

    // throw unknown errors
    return Promise.reject(err);
  });

// migration

// express connection

// controller

// get store list

// post store list

// update store list

// delete store list

// service

// frontend
