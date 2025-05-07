const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/albuns", function (req, res) {
    res.render("albums");
});

module.exports = router;