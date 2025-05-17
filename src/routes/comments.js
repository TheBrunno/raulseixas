const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

router.post("/create", function (req, res) {
    return commentController.create(req, res);
});

module.exports = router;