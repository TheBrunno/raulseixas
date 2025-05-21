const songModel = require('../models/song');
const albumModel = require('../models/album');

const path = require('path');
const fs = require('fs');

const { parseBuffer } = require('music-metadata');

const uploadPath = path.resolve(__dirname, '../../uploads/songs');
const uploadPathLRC = path.resolve(__dirname, '../../uploads/lrc');

const getSongDuration = async (file) => {    
    const durationSeconds = (await parseBuffer(file.buffer, file.mimetype)).format.duration;
    
    const hrs = Math.floor(durationSeconds / 3600);
    const mins = Math.floor((durationSeconds % 3600) / 60);
    const secs = Math.floor(durationSeconds % 60);
    
    const pad = (n) => String(n).padStart(2, '0');
    
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

const saveFile = (req, uploadPath) => {
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
    const uniqueName = saveFile(req, uploadPath);

    songModel.assingSong(id, fkAlbum, 'uploads/songs/'+uniqueName, duration)
        .then((result) => {
            return res.status(200).json({ "src": `uploads/songs/${uniqueName}` });
        }).catch((err) => {
            res.status(500).json(err.sqlMessage);
    });
};

const create = async (req, res) => {
    const { nome, fkAlbum } = req.body;

    const albumExists = await albumModel.albumExists(fkAlbum);

    if(albumExists.length == 0){
        res.status(400).json("Álbum não existe")
    }else{
        const lastIdResult = await songModel.getLastSongId(fkAlbum);
        const newId = (lastIdResult[0].maxId || 0) + 1;
        console.log(newId)
    
        songModel.create(newId, fkAlbum, nome)
            .then((result) => {
                res.status(200).json({ id: newId, nome, fkAlbum })
            }).catch((err) => {
                res.status(500).json(err.sqlMessage);
            });
    }
}

const assingLRC = (req, res) => {
    const { id, fkAlbum } = req.body;

    if(!fs.existsSync(uploadPathLRC)){
        fs.mkdirSync(uploadPathLRC, { recursive: true });
    }

    const uniqueName = saveFile(req, uploadPathLRC);
    songModel.assingLRC(id, fkAlbum, 'uploads/lrc/'+uniqueName)
    .then((result) => {
        return res.status(200).json({ "src": `uploads/lrc/${uniqueName}` });
    }).catch((err) => {
        res.status(500).json(err.sqlMessage);
    });
}

const countView = (req, res) => {
    const { id } = req.params;

    songModel.countView(id).then(
        (result) => {
            if(result.length == 0){
                res.status(400).json("Musica não existe");
            }else{
                songModel.addView(id, result[0].views).then(
                    () => {
                        res.status(200);
                    }
                )
            }
        }
    ).catch((err) => {
        res.status(400).json("Houve um erro na contagem de views");
    })
}

module.exports = {
    assingSong,
    create,
    assingLRC,
    countView
}