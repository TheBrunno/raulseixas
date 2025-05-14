const cardModel = require('../models/card');

const create = async (req, res) => {
    const { descricao, fkAlbum } = req.body;

    await cardModel.create(req.file.filename, descricao, fkAlbum);
}

const getAllCardsFromIdAlbum = async (req, res) => {
    const { fkAlbum } = req.params;

    const result = await cardModel.getAllCardsFromIdAlbum(fkAlbum);

    res.status(200).json(result);
}

module.exports = {
    create,
    getAllCardsFromIdAlbum
}