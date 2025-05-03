const { songExists } = require("../models/song")

const verifyIfSongsExists = (req, res, next) => {
    try{
        const { id, fkAlbum } = req.body;

        songExists(id, fkAlbum)
            .then((result) => {
                if(result.length == 0){
                    return res.status(500).json('Música não existe');
                }
                next();
            }).catch((error) => {
                return res.status(500).json('Música não existe');
            });
    }catch(err){
        return res.status(500).json('Insira o ID da música');
    }
}

module.exports = {
    verifyIfSongsExists
}