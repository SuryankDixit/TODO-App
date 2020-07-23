const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'perntodo',
    password: '010821skd',
    port: 5432,
})

module.exports = pool;