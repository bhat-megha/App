const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const db = new sqlite3.Database('./database.db');
db.run(`CREATE TABLE IF NOT EXISTS receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  amount REAL,
  description TEXT,
  filename TEXT
)`);

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });


app.get('/api/receipts', (req, res) => {
  db.all(`SELECT * FROM receipts`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post('/api/submit', upload.single('receipt'), (req, res) => {
  const { date, amount, description } = req.body;
  const file = req.file;

  if (!file) return res.status(400).send('Receipt file is required.');

  db.run(
    `INSERT INTO receipts (date, amount, description, filename) VALUES (?, ?, ?, ?)`,
    [date, amount, description, file.filename],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }

  );
});

app.listen(4000, () => console.log('Backend running at http://localhost:4000'));
