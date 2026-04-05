const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors');

const app = express();  
app.use(express.json());
app.use(cors());
moongoose.connect('mongodb://127.0.0.1:27017/iot')
.then(()=>{
    console.log('connected to database');
}).catch((err)=>{console.log(err)});
function calculateScore(temp, humidity) {
  let score = 0;
  if (temp > 37) score += (temp - 37) * 2;
  if (humidity > 70) score += 5;

  return score;
}

const DataSchema = new moongoose.Schema({
    userId : String,
    humidity: Number,
    temperature: Number,
    score: Number,
    time: { type: Date, default: Date.now }
}); 
const Data = moongoose.model("Data", DataSchema);
app.post("/data", async (req, res) => {
  try {
    const { userId, temperature, humidity } = req.body;

    if (!userId) return res.status(400).send("userId required");

    const score = calculateScore(temperature, humidity);

    const newData = new Data({
      userId,
      temperature,
      humidity,
      score
    });

    await newData.save();

    res.json({ message: "Data stored", score });

  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.get('/data/:userId',async(req,res)=>{
   const data = await Data.find({ userId: req.params.userId }).sort({ time: -1 }).limit(1);

  res.json(data);
})
app.listen(3000);