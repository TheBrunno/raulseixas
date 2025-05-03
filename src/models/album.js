const database = require('../database/config');

const albumExists = (fkAlbum) => {
    const sqlStatment = `select nome from album
                            where id = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

module.exports = {
    albumExists
}