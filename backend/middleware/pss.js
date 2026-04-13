app.post("/calculate-pss", (req, res) => {
  console.log("API HIT", req.body);

  const temp = Number(req.body.temp);
  const hr = Number(req.body.hr);
  const bp = Number(req.body.bp);
  const waitingTime = 32;
  const density = 60;
  const delay = 5;

  const pss =
    0.4 * waitingTime +
    0.2 * density +
    0.2 * temp +
    0.2 * delay;

  res.json({ pss });
});