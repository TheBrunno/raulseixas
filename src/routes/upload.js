const express = require('express')
const multer  = require('multer')

const storage = require('../config/songMulter.js');
const songUpload = multer({ storage: storage });

const router = express.Router();

router.post('/upload/song', songUpload.single('song'), (req, res) => {
    return res.status(200).json({ file: req.file.filename });
});

module.exports = router;