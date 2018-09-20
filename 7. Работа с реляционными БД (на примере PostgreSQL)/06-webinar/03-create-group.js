const {Client} = require('pg');

const db = new Client({user: 'postgres', host: 'localhost', database: 'test', password: '', port: 5432})

async function connect() {
  await db.connect()
  await db.query('CREATE TABLE groups(g_no text PRIMARY KEY, headman integer NOT NULL REFERENCES s' +
      'tudents(s_id))')
  await db.query('ALTER TABLE students ADD g_no text REFERENCES groups(g_no)')
  await db.query('BEGIN')
  await db.query('INSERT INTO groups(g_no, headman) SELECT $1, s_id FROM students WHERE name = $2', ['Loft-05', 'Млада'])
  await db.query('UPDATE students SET g_no = $1', ['Loft-05'])
  await db.query('COMMIT')
  const students = await db.query('SELECT * FROM students')
  console.log(students.rows);
  const groups = await db.query('SELECT * FROM groups')
  console.log(groups.rows);
  db.end()
}
connect()