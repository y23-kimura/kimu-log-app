// entry point

// DB connection
const { config: dbconf } = require("./src/config/dbconfig");
const knex = require("knex")(dbconf);

// express connection
const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set router
const router = require("./src/controller/stores");

// LOG middleware
app.use((req, res, next) => {
  if (req.method !== "GET") {
    console.log("============= API START =============");
    console.log("Time:", new Date().toLocaleString("ja-JP"));
    console.log("req.method: ", req.method);
    console.log("req.path: ", req.path);
    console.log("req.body: ", req.body);
    console.log("req.params: ", req.params);
    console.log("=====================================");
  }
  next();
});
app.use("/api/v1/stores", router(knex));

// routing for static file
app.use(express.static(`${__dirname}/public`));

// delete store list
const { config: apiconf } = require("./src/config/apiconfig");
const port = apiconf.port;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// service

// frontend
