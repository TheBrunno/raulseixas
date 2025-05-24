const avaliacaoModel = require('../models/avaliacao');

const register = (req, res) => {
    const { fkUsuario, fkAlbum, avaliacao } = req.body;

    avaliacaoModel.register(fkUsuario, fkAlbum, avaliacao)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json(err);
    })
}

module.exports = {
    register
}