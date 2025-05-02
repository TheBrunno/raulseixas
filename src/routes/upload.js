const express = require('express')
const multer  = require('multer')

const storageSong = require('../config/songMulter.js');
const storageCover = require('../config/coverMulter.js');
const songUpload = multer({ storage: storageSong });
const coverUpload = multer({ storage: storageCover });

const router = express.Router();

router.post('/upload/song', songUpload.single('song'), (req, res) => {
    return res.status(200).json({ file: req.file.filename });
});

router.post('/upload/cover', coverUpload.single('cover'), (req, res) => {
    return res.status(200).json({ file: req.file.filename });
});

module.exports = router;