const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/meditrack");

const DataSchema = new mongoose.Schema({
  userId: String,
  heartRate: Number,
  spo2: Number,
  time: { type: Date, default: Date.now }
});

const Data = mongoose.model("Data", DataSchema);

let activeUser = null;

app.post("/start-measurement", (req, res) => {
  activeUser = req.body.userId;

  setTimeout(async () => {
    if (activeUser) {
      await Data.create({
        userId: activeUser,
        heartRate: Math.floor(Math.random() * 40) + 60,
        spo2: Math.floor(Math.random() * 5) + 95
      });
    }
  }, 2000);

  res.json({ message: "Measurement started" });
});
app.get("/", (req, res) => {
  res.send("Meditrack Backend Running 🚀");
});

app.get("/get-data", async (req, res) => {
  const data = await Data.find({ userId: req.query.userId });
  res.json(data);
});

app.listen(3000, () => console.log("Server running on 3000"));