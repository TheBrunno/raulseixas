const albumModel = require('../models/album');
const path = require('path');
const fs = require('fs');

const uploadPath = path.resolve(__dirname, '../../uploads/cover');

const create = async (req, res) => {
    const { nome } = req.body;

    try {
        await albumModel.create(nome);
    } catch (err) {
        return res.status(500).json("Esse álbum já existe!")
    }

    const album = await albumModel.getByName(nome);

    res.status(200).json(album);
}

const addDescription = async (req, res) => {
    const { id, description } = req.body;

    try {
        await albumModel.addDescription(id, description);
    } catch (err) {
        return res.status(501).json("Não foi possível encontrar esse álbum!")
    }

    const album = await albumModel.getById(id);

    if (album.length == 0) return res.status(501).json("Não foi possível encontrar esse álbum!")

    return res.status(200).json(album);
}

const saveFile = (req) => {
    const uniqueName = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname);
    const finalLocal = path.join(uploadPath, uniqueName);

    fs.writeFile(finalLocal, req.file.buffer, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar o arquivo' });
    });

    return uniqueName;
}

const assignAlbum = (req, res, next) => {
    const { id } = req.body;

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueName = saveFile(req);

    albumModel.assignAlbum(id, 'uploads/cover/' + uniqueName)
        .then((result) => {
            return res.status(200).json({ "src": `uploads/cover/${uniqueName}` });
        }).catch((err) => {
            res.status(500).json(err.sqlMessage);
        });
}

const getAllAlbuns = async (req, res) => {  
    const result = await albumModel.getAllAlbuns();

    res.status(200).json(result);
}

const getAlbumByIdWithSongs = async (req, res) => {
    const id = req.params.id;

    const result = await albumModel.getAlbumByIdWithSongs(id);
    return res.status(200).json(result);
}

const editInfos = (req, res) => {
    const { id, titulo, subtitulo, descricao, descricao_avaliacao } = req.body;

    albumModel.editInfos(id, titulo, subtitulo, descricao, descricao_avaliacao)
    .then((result) => {
        res.status(200).json(result);
    })
}

module.exports = {
    create,
    addDescription,
    assignAlbum,
    getAllAlbuns,
    getAlbumByIdWithSongs,
    editInfos
}