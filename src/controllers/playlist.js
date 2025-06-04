const playlistModel = require('../models/playlist');

const getPlaylistsByUserId = (req, res) => {
    const { id } = req.params;

    console.log(id)

    playlistModel.getPlaylistsByUserId(id)
        .then(result => {
            res.status(200).json(result);
        });
}

const putSongIntoPlaylist = (req, res) => {
    const { idPlaylist, idMusica, idUsuario, idAlbum } = req.body;

    playlistModel.putSongIntoPlaylist(idPlaylist, idMusica, idUsuario, idAlbum)
    .then((result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(401).json(err);
    })
}

const getPlaylistsByUserIdForPage = (req, res) => {
    const { fkUsuario } = req.params;

    playlistModel.getPlaylistsByUserIdForPage(fkUsuario)
    .then((result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(401).json(err);
    })
}

const getSongsOfAPlaylistUsingId = (req, res) => {
    const { idPlaylist } = req.params;

    playlistModel.getSongsOfAPlaylistUsingId(idPlaylist)
    .then((result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(401).json(err);
    })
}

module.exports = {
    getPlaylistsByUserId,
    putSongIntoPlaylist,
    getPlaylistsByUserIdForPage,
    getSongsOfAPlaylistUsingId
}