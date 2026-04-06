const express = require('express');
const router = express.Router();
const path = require('path');

//default route to serve the home dashboard
router.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'home_dashboard', 'index.html')
  );
});

module.exports = router;