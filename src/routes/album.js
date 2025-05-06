const express = require('express');
const router = express.Router();

const albumController = require('../controllers/album');

router.post("/create", function (req, res) {
    albumController.create(req, res);
});

router.post("/edit/description", function (req, res) {
    albumController.addDescription(req, res);
});


module.exports = router;