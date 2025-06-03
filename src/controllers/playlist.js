const playlistModel = require('../models/playlist');

const getPlaylistsByUserId = (req, res) => {
    const { id } = req.params;

    console.log(id)

    playlistModel.getPlaylistsByUserId(id)
        .then(result => {
            res.status(200).json(result);
        });
}

module.exports = {
    getPlaylistsByUserId
}