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

const verify = (req, res) => {
    const { fkusuario, fkalbum } = req.params;

    avaliacaoModel.verify(fkusuario, fkalbum)
    .then((result) => {
        if(result.length == 0){
            res.status(200).json(0);
        }else{
            res.status(200).json(1);
        }
    }).catch((err) => {
        res.status(400).json(err);
    })
}

module.exports = {
    register,
    verify
}