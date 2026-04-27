const express = require('express');
const router = express.Router();
const path = require('path');
const Patient = require("../models/Patient");

router.get("/", async (req, res) => {
  const hospitals = await Patient.distinct("hospital");

  res.render("home_dashboard/index", { hospitals });
});




module.exports = router;