const songModel = require('../models/song');
const path = require('path');
const fs = require('fs');

const uploadPath = path.resolve(__dirname, '../../uploads/songs');

const assingSong = (req, res, next) => {
    const { id, fkAlbum } = req.body;

    if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueName = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname);
    const finalLocal = path.join(uploadPath, uniqueName);

    fs.writeFile(finalLocal, req.file.buffer, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar o arquivo' });
    
        req.savedFilename = uniqueName;
    });

    songModel.assingSong(id, fkAlbum, 'uploads/songs/'+uniqueName)
        .then((result) => {
            next();
        }).catch((err) => {
            res.status(500).json(err.sqlMessage);
    });
}; 

module.exports = {
    assingSong
}