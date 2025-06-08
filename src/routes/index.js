const express = require("express");
const router = express.Router();

const indexController = require('../controllers/index');


router.get("/", function (req, res) {
    res.render("index");
});

router.get('/getAlbuns', function (req, res){
    indexController.getAlbuns(req, res);
})

module.exports = router;