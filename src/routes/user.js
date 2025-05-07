const express = require("express");
const router = express.Router();

const userControllers = require('../controllers/user');

router.post("/signup", function (req, res) {
    userControllers.cadastrar(req, res);
});

router.post("/signin", function (req, res) {
    userControllers.autenticar(req, res);
});


module.exports = router;