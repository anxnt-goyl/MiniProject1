const express = require("express");
const router = express.Router();

router.post("/calculate-pss", (req, res) => {
 // console.log("API HIT", req.body);

  const temp = Number(req.body.temp);
  const hr = Number(req.body.hr);
  const bp = Number(req.body.bp);

  const waitingTime = 32;
  const density = 60;

  const pss =
    0.4 * waitingTime +
    0.2 * density +
    0.2 * temp ;

  res.json({ pss });
});
const Patient = require("../models/Patient");

router.post("/api/pss", async (req, res) => {
    const { ptemail, pss, status } = req.body;

    console.log("DATA RECEIVED:", req.body);

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
    createdAt: { $lt: current.createdAt }
  });

  const waitingTime = count * 5;

  res.json({ waitingTime });
});
router.get('/token/:hospital/:email', async (req, res) => {
  const { hospital, email } = req.params;

  const current = await Patient.findOne({ email });

  const count = await Patient.countDocuments({
    hospital: new RegExp(`^${hospital}$`, "i"),
    createdAt: { $lt: current.createdAt }
  });

  const token = count + 1;

  res.json({ token });
});
module.exports = router;