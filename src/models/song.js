const database = require('../database/config');

const songExists = (id, fkAlbum) => {
    const sqlStatment = `select nome from musica
                            where id = ${id} and fkAlbum = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

const assingSong = (id, fkAlbum, local) => {
    const sqlStatment = `update musica set local = '${local}'
                            where id = ${id} and fkAlbum = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

module.exports = {
    songExists,
    assingSong
}