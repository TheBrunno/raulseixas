const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacao');

router.post('/register', function (req, res){
    avaliacaoController.register(req, res);
})

module.exports = router;