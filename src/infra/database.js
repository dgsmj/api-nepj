const pgp = require('pg-promise')();
const db = pgp({
    user: 'ubuntu',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

module.exports = db;