const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Density = require("../models/Density");

router.post("/density", async (req, res) => {
  const { hospital, count } = req.body;

  await Density.create({ hospital, count });

  res.json({ msg: "Density saved" });
});

router.get("/avg-density", async (req, res) => {
  const hospitals = await Patient.distinct("hospital");
  const densityData = await Density.aggregate([
    {
      $group: {
        _id: "$hospital",
        avgDensity: { $avg: "$count" }
      }
    }
  ]);
  const finalData = hospitals.map(h => {
  const found = densityData.find(d => d._id === h);

    return {
      hospital: h,
      avgDensity: found ? found.avgDensity : 0
    };
  });

  res.json(finalData);
});

module.exports = router;