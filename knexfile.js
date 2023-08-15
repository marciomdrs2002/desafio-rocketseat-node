const path = require("path");

module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, "src", "database", "database.db") // Nome do arquivo de banco de dados
      },
      pool: {
        afterCreate:(conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
      migrations: {
        directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
      },
      useNullAsDefault: true, // Configuração específica do SQLite,
      /* debug: true, */
    }
  };
  