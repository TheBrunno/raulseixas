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
});

router.get("/getAllUsers", function (req, res){
    dashboardController.getAllUsers(req, res);
});

router.get("/getAllAlbums", function (req, res){
    dashboardController.getAllAlbums(req, res);
});

router.get("/getPlaylistNumberSongsPerAlbum", function (req, res){
    dashboardController.getPlaylistNumberSongsPerAlbum(req, res);
});

router.get("/getSongsMostAddedInPlaylists", function (req, res){
    dashboardController.getSongsMostAddedInPlaylists(req, res);
})

module.exports = router;