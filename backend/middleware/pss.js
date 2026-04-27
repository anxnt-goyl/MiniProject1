const express = require("express");
const router = express.Router();

router.post("/calculate-pss", (req, res) => {
 // console.log("API HIT", req.body);

  const temp = Number(req.body.temp);
  const hr = Number(req.body.hr);
  const bp = Number(req.body.bp);

  const waitingTime = 32;
  const density = 60;

 let pss =Math.round((0.3 * (Math.abs(bp - 120) / 120) + 0.2 * (Math.abs(temp - 98.6) / 98.6)+ 0.5 * (Math.abs(hr - 75) / 75)) * 100);

  if (temp >= 102) pss += 20;
  if (bp >= 140 || bp <= 90) pss += 15;
  if (hr >= 100 || hr <= 60) pss += 15;
  if (temp >= 103 && hr >= 100) pss += 25;

  res.json({ pss });
});
const Patient = require("../models/Patient");

router.post("/api/pss", async (req, res) => {
    const { ptemail, pss } = req.body;
    console.log("NEW LOGIC RUNNING");

  console.log("DATA RECEIVED:", req.body);
   let status = 'stable';
            let priority = 'LOW';

            if (pss >= 50) {
              status = 'critical';
              priority = 'HIGH';
            } else if (pss >= 25) {
              status = 'monitoring';
              priority = 'HIGH';
            } else if (pss >= 10) {
              status = 'monitoring';
              priority = 'MEDIUM';
            } else {
              status = 'stable';
              priority = 'LOW';
            }

    const updated = await Patient.findOneAndUpdate(
        { email : ptemail },
        { pss, status },
        { returnDocument: 'after' }
    );

    res.json(updated);
});
router.get("/api/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});
router.get('/waiting/:hospital/:email', async (req, res) => {
  const { hospital, email } = req.params;
  const current = await Patient.findOne({ email });
  const count = await Patient.countDocuments({
    hospital: new RegExp(`^${hospital}$`, "i"),
    pss: {$gt: current.pss}
  });

  const waitingTime = count * 5;

  res.json({ waitingTime });
});
router.get('/token/:hospital/:email', async (req, res) => {
  const { hospital, email } = req.params;

  const current = await Patient.findOne({ email });

  const count = await Patient.countDocuments({
    hospital: new RegExp(`^${hospital}$`, "i"),
    pss: { $gt: current.pss }
  });

  const token = count + 1;

  res.json({ token });
});
module.exports = router;