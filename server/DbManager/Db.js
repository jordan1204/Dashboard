const Postgres = require("./Postgres");

const connectionConfig = {
    host:"192.168.1.104",
    user:"postgres",
    password:"postgres",
    max: 5,
    connectionTimeoutMillis: 5000,
    port:5432,
    database: "acv_dashboard"
};

var db = new Postgres(connectionConfig);

module.exports = db;