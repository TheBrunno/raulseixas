const dashboardModel = require('../models/dashboard');

const getMostListenedSongs = (req, res) => {
    const id = req.params.id;

    if(id == 'geral'){
        dashboardModel.getMostOrLessListenedSongs('desc').then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json(err);
        });
    }else{
        dashboardModel.getMostOrLessListenedSongsByAlbum(id, 'desc').then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json(err);
        });
    }    
}

const getLessListenedSongs = (req, res) => {
    const id = req.params.id;

    if(id == 'geral'){
        dashboardModel.getMostOrLessListenedSongs('asc').then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json(err);
        });
    }else{
        dashboardModel.getMostOrLessListenedSongsByAlbum(id, 'asc').then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(400).json(err);
        });
    }
}

const getViewsPerAlbum = (req, res) => {
    dashboardModel.getViewsPerAlbum().then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json(err);
    });
}

const getRatingPerAlbum = (req, res) => {
    dashboardModel.getRatingPerAlbum().then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json(err);
    });
}

const getAllUsers = (req, res) => {
    dashboardModel.getAllUsers().then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json(err);
    });
}

const getAllAlbums = (req, res) => {
    dashboardModel.getAllAlbums()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

const getSongsMostAddedInPlaylists = (req, res) => {
    dashboardModel.getSongsMostAddedInPlaylists()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

const getPlaylistNumberSongsPerAlbum = (req, res) => {
    dashboardModel.getPlaylistNumberSongsPerAlbum()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

module.exports = {
    getMostListenedSongs,
    getLessListenedSongs,
    getViewsPerAlbum,
    getRatingPerAlbum,
    getAllUsers,
    getAllAlbums,
    getSongsMostAddedInPlaylists,
    getPlaylistNumberSongsPerAlbum
}