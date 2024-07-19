const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Preethi*1112',
  database: 'segment_db',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.post('/save-segment', (req, res) => {
  const { segment_name, schema } = req.body;
  const query = 'INSERT INTO segments (segment_name, segment_schema) VALUES (?, ?)';
  db.query(query, [segment_name, JSON.stringify(schema)], (err, result) => {
    if (err) {
      console.error('Error saving segment:', err);
      res.status(500).send('Error saving segment');
      return;
    }
    res.status(200).send('Segment saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
