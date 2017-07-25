'use strict';

const express = require('express');
const requestProxy = require('express-request-proxy');
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const conString = '';
const client = new pg.Client(conString);
const app = express();
client.connect();
client.on('error', err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'});
});

app.get('/tasks', (req, res) => {
  client.query(`SELECT * FROM tasks`)
  .then(tasks => res.send(tasks.rows));
});

app.post('/task', function(req, res) {
  client.query(
    `INSERT INTO tasks(category, title, start_task, end_task, description) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`,
    [req.body.category, req.body.title, req.body.start_task, req.body.end_task, req.body.description],
    function(err) {
      if(err) console.log(err)
    }
  )
});

app.delete('/task/:title', (req, res) => {
  client.query(
    `DELETE FROM tasks WHERE title=$1`,
    [req.params.title]
  )
  .then(() => res.send('Deleted'))
  .catch(console.error);
});

app.listen(PORT, () => {
  console.log(`You are on port: ${PORT}. Enjoy the Storm.`);
});

loadDB();

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    tasks (
      task_id SERIAL PRIMARY KEY,
      category VARCHAR (255) NOT NULL,
      title VARCHAR (255) NOT NULL,
      start_task VARCHAR (255),
      end_task VARCHAR (255),
      description VARCHAR (255)
    );`
  )
}
