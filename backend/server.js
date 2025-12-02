const express = require("express");
const cors = require("cors");
const fs = require("fs");


const dataFile = "C:\\Users\\drew\\C++\\Project_Group_11_Recipe_Sharing_Platform\\backend\\data.json";

const app = express();
app.use(express.json());
app.use(cors());

console.log(" Using data file:", dataFile);

// ---------- Safe JSON Reader ----------
function readData() {
  try {
    const raw = fs.readFileSync(dataFile, "utf8").trim();
    if (!raw || raw[0] !== "{") throw new Error("Invalid JSON data");
    return JSON.parse(raw);
  } catch (err) {
    console.log("⚠️ Invalid or missing JSON — resetting file...");
    const reset = { comments: {}, ratings: {} };
    writeData(reset);
    return reset;
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// ---------- RATING ----------
app.post("/rate", (req, res) => {
  const { recipeId, rating } = req.body;
  const data = readData();

  if (!data.ratings[recipeId]) data.ratings[recipeId] = [];
  data.ratings[recipeId].push(rating);

  writeData(data);
  res.json({ message: "Rating saved." });
});

app.get("/rating/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const data = readData();
  const list = data.ratings[recipeId] || [];

  const average = list.length ? list.reduce((a, b) => a + b, 0) / list.length : 0;

  res.json({
    average: Number(average).toFixed(1),
    count: list.length,
  });
});

// ---------- COMMENTS ----------
app.post("/comment", (req, res) => {
  const { recipeId, comment } = req.body;
  const data = readData();

  if (!data.comments[recipeId]) data.comments[recipeId] = [];
  data.comments[recipeId].push(comment);

  writeData(data);

  res.json({ message: "Comment saved." });
});

app.get("/comments/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;
  const data = readData();

  res.json({
    comments: data.comments[recipeId] || [],
  });
});

// ---------- START SERVER ----------
const PORT = 3001;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
