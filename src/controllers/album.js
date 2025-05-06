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

module.exports = {
    create
}