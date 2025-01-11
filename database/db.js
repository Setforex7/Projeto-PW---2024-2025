const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'KingZoro1.',
  host: 'localhost',
  port: 7777, // default Postgres port
  database: 'postgres'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};