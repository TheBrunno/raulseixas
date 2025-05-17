const commentModel = require('../models/comment');

const create = (req, res) => {
    const { fkUsuario, fkAlbum, comment } = req.body;

    commentModel.create(fkUsuario, fkAlbum, comment).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json(err);
    })
}

module.exports = {
    create
}