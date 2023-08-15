exports.up = function (knex) {
  return knex.schema.createTable("movie_notes", (table) => {
    table.increments("id").primary();
    table.varchar("title");
    table.varchar("description");
    table.integer("rating");
    table.integer("user_id").references("id").inTable("users");

    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return table.schema.dropTableIfExists("movie_notes");
};
