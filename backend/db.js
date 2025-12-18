const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./equipment.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT,
      status TEXT,
      lastCleaned TEXT
    )
  `);
});

module.exports = db;
