const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard');

router.get("/getMostListenedSongs", function (req, res) {
    dashboardController.getMostListenedSongs(req, res);
});


module.exports = router;