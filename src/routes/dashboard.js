const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard');

router.get("/getMostListenedSongs/:id", function (req, res) {
    dashboardController.getMostListenedSongs(req, res);
});

router.get("/getLessListenedSongs/:id", function (req, res) {
    dashboardController.getLessListenedSongs(req, res);
});

router.get("/getViewsPerAlbum", function(req, res) {
    dashboardController.getViewsPerAlbum(req, res);
});

router.get("/getRatingPerAlbum", function (req, res){
    dashboardController.getRatingPerAlbum(req, res);
})


module.exports = router;