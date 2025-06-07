const express = require('express');
const router = express.Router();

const playlistController = require('../controllers/playlist');

router.get('/getPlaylistsByUserId/:id', function (req, res) {
    playlistController.getPlaylistsByUserId(req, res);
})

router.post('/putSongIntoPlaylist/', function (req, res) {
    playlistController.putSongIntoPlaylist(req, res);
})

router.get('/getPlaylistsByUserIdForPage/:fkUsuario', function (req, res) {
    playlistController.getPlaylistsByUserIdForPage(req, res);
})

router.get('/getSongsOfAPlaylistUsingId/:idPlaylist', function (req, res){
    playlistController.getSongsOfAPlaylistUsingId(req, res);
})

router.post('/createPlaylist/', function (req, res){
    playlistController.createPlaylist(req, res);
})

module.exports = router;