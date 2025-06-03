const express = require('express');
const router = express.Router();

const playlistController = require('../controllers/playlist');

router.get('/getPlaylistsByUserId/:id', function (req, res) {
    playlistController.getPlaylistsByUserId(req, res);
})

router.post('/putSongIntoPlaylist/', function (req, res) {
    playlistController.putSongIntoPlaylist(req, res);
})


module.exports = router;