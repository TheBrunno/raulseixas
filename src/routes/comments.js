const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

router.post("/create", function (req, res) {
    return commentController.create(req, res);
});

router.get("/getAllByAlbum/:fkAlbum", function (req, res) {
    return commentController.getAllByAlbum(req, res);
})

module.exports = router;