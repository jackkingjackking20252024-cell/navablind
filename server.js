// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory DB (replace with real DB later)
let db = {
  staffList: [],
  dailyEntries: [],
  advances: [],
};

// Routes
app.get("/", (req, res) => {
  res.json({ message: "BlindShop API is running 🚀" });
});

// Staff
app.get("/staff", (req, res) => res.json(db.staffList));
app.post("/staff", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  db.staffList.push({ id: Date.now(), name });
  res.json({ success: true, staffList: db.staffList });
});

// Daily Entries
app.get("/entries", (req, res) => res.json(db.dailyEntries));
app.post("/entries", (req, res) => {
  const entry = { id: Date.now(), ...req.body };
  db.dailyEntries.push(entry);
  res.json({ success: true, entry });
});

// Advances
app.get("/advances", (req, res) => res.json(db.advances));
app.post("/advances", (req, res) => {
  const adv = { id: Date.now(), ...req.body };
  db.advances.push(adv);
  res.json({ success: true, adv });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));