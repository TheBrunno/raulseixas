const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacao');

router.post('/register', function (req, res){
    avaliacaoController.register(req, res);
})

router.get('/verify/:fkusuario/:fkalbum', function(req, res){
    avaliacaoController.verify(req, res);
})

module.exports = router;