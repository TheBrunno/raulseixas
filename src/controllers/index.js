const indexModel = require('../models/index');

const getAlbuns = (req, res) => {
    indexModel.getAllAlbums().then((result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    })
}

module.exports = {
    getAlbuns
}