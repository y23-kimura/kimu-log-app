// entry point

// DB connection
const { config: dbconf } = require("./src/config/dbconfig");
const knex = require("knex")(dbconf);
const app = require("./server")(knex);

// delete store list
const { config: apiconf } = require("./src/config/apiconfig");
const port = apiconf.port;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// service

// frontend
