const {Client} = require('pg');

const db = new Client({user: 'postgres', host: 'localhost', database: 'test', password: '', port: 5432})

async function connect() {
  await db.connect()
  await db.query('INSERT INTO students(s_id, name, start_year) VALUES ($1, $2, $3)', [1567, ' Рамиль ', 2018])
  await db.query('UPDATE students SET start_year = $1 WHERE s_id = 1567', [2015])
  const data = await db.query('SELECT * FROM students')
  console.log(data.rows);
  db.end()
}
connect()