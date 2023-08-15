exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.varchar("name").notNullable();
    table.varchar("email").notNullable().unique();
    table.varchar("password").notNullable();
    table.varchar("avatar");
    table.timestamps(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
