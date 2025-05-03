const express = require('express');
const router = express.Router();

const songController = require('../controllers/song');

router.post("/create", function (req, res) {
    songController.create(req, res);
});


module.exports = router;