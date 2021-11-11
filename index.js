// entry point

// DB connection
const { config: dbconf } = require("./src/config/dbconfig");
const knex = require("knex")(dbconf);

const table = "store";
// const obj = {
//   name: "ySHOPS",
//   address: "世田谷区",
//   tel: "000-000-00",
// };
// knex(table)
//   .insert(obj)
//   .catch((err) => {
//     // sanitize known errors
//     if (
//       err.message.match("duplicate key value") ||
//       err.message.match("UNIQUE constraint failed")
//     )
//       return Promise.reject(new Error("That username already exists"));

//     // throw unknown errors
//     return Promise.reject(err);
//   });

// migration

// express connection
const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const apiRouter = require("./src/controller/stores");
app.use("/api/v1/stores", apiRouter(knex));

app.use(express.static(`${__dirname}/public`));

// delete store list
const { config: apiconf } = require("./src/config/apiconfig");
const port = apiconf.port;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// service

// frontend
