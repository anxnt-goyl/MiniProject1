const express = require('express');
const router = express.Router();
const path = require('path');

//default route to serve the home dashboard
router.get('/', (req, res) => {
    res.render('home_dashboard/index');
});

module.exports = router;