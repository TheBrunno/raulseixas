const { albumExists } = require("../models/album")

const verifyIfAlbunsExists = (req, res, next) => {
    try{
        const { id } = req.body;

        albumExists(id)
            .then((result) => {
                if(result.length == 0){
                    return res.status(500).json('Álbum não existe');
                }
                next();
            }).catch((error) => {
                return res.status(500).json('Álbum não existe');
            });
    }catch(err){
        return res.status(500).json('Insira o ID do álbum');
    }
}

module.exports = {
    verifyIfAlbunsExists
}