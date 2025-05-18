const express = require('express')
const multer  = require('multer')

const storageSong = require('../config/songMulter.js');
const storageCover = require('../config/coverMulter.js');
const storageCard = require('../config/cardMulter.js');
const storageUser = require('../config/userMulter.js');


const { verifyIfSongsExists } = require('../middlewares/verifyIfSongsExists.js');
const { verifyIfAlbunsExists } = require('../middlewares/verifyIfAlbunsExists.js');

const songUpload = multer({ storage: storageSong });
const coverUpload = multer({ storage: storageCover });
const cardUpload = multer({ storage: storageCard })
const userUpload = multer({ storage: storageUser })
const songLRCUpload = multer({ storage: storageSong })


const { assingSong, assingLRC } = require('../controllers/song.js');
const { assignAlbum } = require('../controllers/album.js');
const cardController = require('../controllers/card.js');
const userController = require('../controllers/user.js');

const router = express.Router();

router.post('/upload/song', songUpload.single('song'), verifyIfSongsExists, assingSong, (req, res) => {
    return res.status(200).json({ file: req.file.originalname });
});
router.post('/upload/songLRC', songLRCUpload.single('songLRC'), verifyIfSongsExists, assingLRC, (req, res) => {
    return res.status(200).json({ file: req.file.originalname });
});

router.post('/upload/cover', coverUpload.single('cover'), verifyIfAlbunsExists, assignAlbum, (req, res) => {
    return res.status(200).json({ file: req.file.originalname });
});

router.post('/upload/card', cardUpload.single('photo'), (req, res) => {
    
    cardController.create(req, res);

    return res.status(200).json({ file: req.file.originalname });
});

router.post('/upload/userpfp', userUpload.single('userpfp'), (req, res) => { 
    userController.uploadIMG(req, res);

    return res.status(200).json({ file: "uploads/user/"+req.file.filename });
});

module.exports = router;