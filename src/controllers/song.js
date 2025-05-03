const songModel = require('../models/song');

const assingSong = (req, res, next) => {

    const { id, fkAlbum } = req.body;
    const local = req.file.filename;

    songModel.assingSong(id, fkAlbum, local)
        .then((result) => {
            next();
        }).catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
}; 

module.exports = {
    assingSong
}