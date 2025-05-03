const songModel = require('../models/song');
const path = require('path');
const fs = require('fs');

const { parseBuffer } = require('music-metadata');

const uploadPath = path.resolve(__dirname, '../../uploads/songs');

const getSongDuration = async (file) => {    
    const durationSeconds = (await parseBuffer(file.buffer, file.mimetype)).format.duration;
    
    const hrs = Math.floor(durationSeconds / 3600);
    const mins = Math.floor((durationSeconds % 3600) / 60);
    const secs = Math.floor(durationSeconds % 60);
    
    const pad = (n) => String(n).padStart(2, '0');
    
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

const saveFile = (req) => {
    const uniqueName = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname);
    const finalLocal = path.join(uploadPath, uniqueName);

    fs.writeFile(finalLocal, req.file.buffer, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar o arquivo' });
    });

    return uniqueName;
}

const assingSong = async (req, res, next) => {
    const { id, fkAlbum } = req.body;

    if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const duration = await getSongDuration(req.file);
    const uniqueName = saveFile(req);

    songModel.assingSong(id, fkAlbum, 'uploads/songs/'+uniqueName, duration)
        .then((result) => {
            next();
        }).catch((err) => {
            res.status(500).json(err.sqlMessage);
    });
}; 

module.exports = {
    assingSong
}