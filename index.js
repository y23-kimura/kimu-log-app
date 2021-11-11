// entry point
// read config file
require("dotenv").config();
// DB connection

const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// controller

// get store list
app.get("/v1/stores", async (req, res) => {
  try {
    const response = await knex.select().from(table);
    res.send({ results: response });
  } catch (error) {
    throw Error(error);
  }
});

// post store list
app.post("/v1/stores", async (req, res) => {
  try {
    const { body } = req;
    console.log(req);
    // TODO: validation check
    console.log(body);
    const { rowCount: count } = await knex(table).insert(body);
    res.send({ results: count });
  } catch (error) {
    res.status(500).end();
    throw error;
  }
});

// update store list

app.patch("/v1/stores/:id", async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    // TODO: validation check
    const { rowCount: count } = await knex(table).where({ id }).update(body);
    res.send({ results: count });
  } catch (error) {
    res.status(500).end();
    throw error;
  }
});

// delete store list
const port = process.env.EXPRESS_PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// service

// frontend
