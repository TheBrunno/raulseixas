const dashboardModel = require('../models/dashboard');

const getMostListenedSongs = (req, res) => {
    
    dashboardModel.getMostOrLessListenedSongs('desc').then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json(err);
    });
}

const getLessListenedSongs = (req, res) => {
    
    dashboardModel.getMostOrLessListenedSongs('asc').then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(400).json(err);
    });
}

module.exports = {
    getMostListenedSongs,
    getLessListenedSongs
}