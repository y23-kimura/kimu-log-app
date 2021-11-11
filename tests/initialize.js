const { config } = require("../src/config/dbconfig");
const knex = require("knex")(config);

const ignoreError = () => {
  // do nothing
};

const clearTable = (tableName) => knex(tableName).del().catch(ignoreError);

const tables = ["store"];

Promise.all(tables.map(clearTable)).then(process.exit);
