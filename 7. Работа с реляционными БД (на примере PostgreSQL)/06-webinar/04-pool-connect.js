const {Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

async function connect() {
  const db = await pool.connect()

  const data = await db.query('SELECT * FROM students')
  console.log(data.rows);
  pool
    .end()
    .then(() => console.log('pool has ended'))
}
connect()