const database = require('../database/config');

const songExists = (id, fkAlbum) => {
    const sqlStatment = `select nome from musica
                            where id = ${id} and fkAlbum = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

const assingSong = (id, fkAlbum, local, duration) => {
    const sqlStatment = `update musica set srcMusica = '${local}', duracao = '${duration}'
                            where id = ${id} and fkAlbum = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

const getLastSongId = (fkAlbum) => {
    const sqlStatment = `select max(id) as maxId from musica 
                            where fkAlbum = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

const create = (id, fkAlbum, nome) => {
    const sqlStatment = `insert into musica (id, fkAlbum, nome) 
                        values (${id}, ${fkAlbum}, '${nome}')`;

    return database.execute(sqlStatment);
}

const assingLRC = (id, fkAlbum, local) => {
    const sqlStatment = `
        update musica set srcLRC = '${local}'
        where id = ${id} and fkAlbum = ${fkAlbum}
    `;

    return database.execute(sqlStatment);
}

const countView = (id, fkAlbum) => {
    const sqlStatment = `
        select views from musica
        where id = ${id} and fkAlbum = ${fkAlbum};
    `;

    return database.execute(sqlStatment);
}

const addView = (id, fkAlbum, lastView) => {
    const sqlStatment = `
        update musica set views = ${lastView+1}
        where id = ${id} and fkAlbum = ${fkAlbum};
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    songExists,
    assingSong,
    getLastSongId,
    create,
    assingLRC,
    countView,
    addView
}