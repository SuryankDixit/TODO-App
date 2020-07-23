const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'perntodo',
    password: '010821skd',
    port: 3211,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}