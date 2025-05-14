const cardModel = require('../models/card');

const create = (req, res) => {
    const { descricao, fkAlbum } = req.body;

    cardModel.create(req.file.filename, descricao, fkAlbum).then((result) => {
        console.log(result);
    })
}

module.exports = {
    create
}