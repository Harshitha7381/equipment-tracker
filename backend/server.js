const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/equipment", (req, res) => {
  db.all("SELECT * FROM equipment", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/api/equipment", (req, res) => {
  const { name, type, status, lastCleaned } = req.body;

  db.run(
    "INSERT INTO equipment (name, type, status, lastCleaned) VALUES (?, ?, ?, ?)",
    [name, type, status, lastCleaned],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

app.put("/api/equipment/:id", (req, res) => {
  const { name, type, status, lastCleaned } = req.body;

  db.run(
    "UPDATE equipment SET name=?, type=?, status=?, lastCleaned=? WHERE id=?",
    [name, type, status, lastCleaned, req.params.id],
    () => res.sendStatus(200)
  );
});

app.delete("/api/equipment/:id", (req, res) => {
  db.run(
    "DELETE FROM equipment WHERE id=?",
    [req.params.id],
    () => res.sendStatus(200)
  );
});

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
