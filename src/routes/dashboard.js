const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard');

router.get("/getMostListenedSongs/:id", function (req, res) {
    dashboardController.getMostListenedSongs(req, res);
});

router.get("/getLessListenedSongs/:id", function (req, res) {
    dashboardController.getLessListenedSongs(req, res);
});


module.exports = router;