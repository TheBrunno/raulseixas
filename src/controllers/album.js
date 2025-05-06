const albumModel = require('../models/album');

const create = async (req, res) => {
    const { nome } = req.body;

    try{
        await albumModel.create(nome);
    }catch(err){
        return res.status(500).json("Esse álbum já existe!")
    }

    const album = await albumModel.getByName(nome);

    res.status(200).json(album);
}

const addDescription = async (req, res) => {
    const { id, description } = req.body;

    try{
        await albumModel.addDescription(id, description);
    }catch(err){
        return res.status(501).json("Não foi possível encontrar esse álbum!")
    }

    const album = await albumModel.getById(id);

    if(album.length == 0) return res.status(501).json("Não foi possível encontrar esse álbum!")

    return res.status(200).json(album);
}

module.exports = {
    create,
    addDescription
}