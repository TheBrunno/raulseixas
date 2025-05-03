const express = require('express')
const multer  = require('multer')

const storageSong = require('../config/songMulter.js');
const storageCover = require('../config/coverMulter.js');
const { verifyIfSongsExists } = require('../middlewares/verifyIfSongsExists.js');
const songUpload = multer({ storage: storageSong });
const coverUpload = multer({ storage: storageCover });

const { assingSong } = require('../controllers/song.js');

const router = express.Router();

router.post('/upload/song', songUpload.single('song'), verifyIfSongsExists, assingSong, (req, res) => {
    return res.status(200).json({ file: req.file.originalname });
});

router.post('/upload/cover', coverUpload.single('cover'), (req, res) => {
    return res.status(200).json({ file: req.file.filename });
});

module.exports = router;