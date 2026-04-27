const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Density = require("../models/Density");


router.get("/avg-density", async (req, res) => {
  const hospitals = await Patient.distinct("hospital");
  const densityData = await Patient.aggregate([
    {
      $group: {
        _id: "$hospital",
        totalPatients: { $sum: 1 }        
      }
    }
  ]);
  res.json(densityData);
});

module.exports = router;