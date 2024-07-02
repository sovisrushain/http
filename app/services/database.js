const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'cisco',
    database: 'crud',
    port: 5432,
})

module.exports = { pool }