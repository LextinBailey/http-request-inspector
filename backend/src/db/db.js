const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "request_inspector",
    port: 5432
});

module.exports = pool;