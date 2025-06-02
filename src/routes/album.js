const express = require('express');
const router = express.Router();

const albumController = require('../controllers/album');
const cardController = require('../controllers/card');

router.post("/create", function (req, res) {
    albumController.create(req, res);
});

router.post("/edit/description", function (req, res) {
    albumController.addDescription(req, res);
});

router.get("/getAllAlbuns", function (req, res) {
    albumController.getAllAlbuns(req, res)
})

router.get("/getAlbumWithSongs/:id", function (req, res) {
    albumController.getAlbumByIdWithSongs(req, res);
})

router.get("/getCards/:fkAlbum", function (req, res){
    cardController.getAllCardsFromIdAlbum(req, res);
});

router.post('/edit/album', function(req, res) {
    albumController.editInfos(req, res);
})

module.exports = router;