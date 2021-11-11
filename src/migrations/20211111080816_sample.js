exports.up = function (knex) {
  return knex.schema.createTable("store", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("user", 20) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.string("address", 20) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.string("tel", 20) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
  });
};

exports.down = function (knex) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("store");
};
