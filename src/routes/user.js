const express = require("express");
const router = express.Router();

const userControllers = require('../controllers/user');

router.post("/signup", function (req, res) {
    userControllers.register(req, res);
});

module.exports = router;