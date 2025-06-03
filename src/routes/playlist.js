const express = require('express');
const router = express.Router();

const playlistController = require('../controllers/playlist');

router.get('/getPlaylistsByUserId/:id', function (req, res) {
    playlistController.getPlaylistsByUserId(req, res);
})

module.exports = router;