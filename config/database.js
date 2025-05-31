const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../tenders.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS tenders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        orderer TEXT NOT NULL,
        max_price REAL,
        description TEXT,
        start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        end_time DATETIME NOT NULL
    )`, (err) => {
        if (err) {
        console.error("Error creating table 'tenders'", err.message);
        } else {
        console.log("Table 'tenders' created or already exists.");
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS offers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        offerer_name TEXT NOT NULL,
        price REAL NOT NULL,
        placed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        tender_id INTEGER NOT NULL,
        FOREIGN KEY (tender_id) REFERENCES tenders (id) ON DELETE CASCADE
    )`, (err) => {
        if (err) {
        console.error("Error creating table 'offers'", err.message);
        } else {
        console.log("Table 'offers' created or already exists.");
        }
    });
}
});

module.exports = db;