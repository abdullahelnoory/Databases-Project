const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SwiftRoute",
  password: "yousefadel@2024",
  port: 5432,
});

module.exports = pool;
