const express = require('express');
const router = express.Router();

const songController = require('../controllers/song');

router.post("/create", function (req, res) {
    songController.create(req, res);
});

router.get("/view/:id/:fkAlbum", function (req, res){
    songController.countView(req, res);
})

router.post('/search', function (req, res){
    songController.searchSongs(req, res);
})

module.exports = router;