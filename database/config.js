const { createPool } = require("mysql2");

const conn = createPool({
    port:process.env.db_port,
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_pass,
    database:process.env.mysql_db,
    connectionLimit:10
});
module.exports = conn;