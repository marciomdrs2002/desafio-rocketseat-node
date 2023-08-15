exports.up = function (knex) {
  return knex.schema.createTable("movie_tags", (table) => {
    table.increments("id").primary();
    table.varchar("name").notNullable();

    table.integer("note_id").references("id").inTable("movie_notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("movie_tags");
};
