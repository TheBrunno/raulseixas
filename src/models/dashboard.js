const database = require('../database/config');

const getMostOrLessListenedSongs = (mode) => {
    const sqlStatment = `
        select nome, views from musica
        order by views ${mode}
        limit 9;
    `;

    return database.execute(sqlStatment);
}

const getMostOrLessListenedSongsByAlbum = (id, mode) => {
    const sqlStatment = `
        select nome, views from musica
        where fkalbum = ${id}
        order by views ${mode}
        limit 9;
    `;

    return database.execute(sqlStatment);
}

const getViewsPerAlbum = () => {
    const sqlStatment = `
        select alb.id, alb.nome, sum(views) views_album from album alb
        inner join musica msc on msc.fkalbum = alb.id
        group by alb.id, alb.nome
        order by views_album desc;
    `;

    return database.execute(sqlStatment);
}

const getRatingPerAlbum = () => {
    const sqlStatment = `
        select nome album, round((select avg(avaliacao) from avaliacao where fkalbum = album.id group by fkalbum), 1) avaliacao
        from album order by avaliacao desc;
    `;

    return database.execute(sqlStatment);
}

const getAllUsers = () => {
    const sqlMessage = `
        select nome, email, isADM, foto, prestigio, contadorLogins from usuario;
    `;

    return database.execute(sqlMessage);
}

module.exports = {
    getMostOrLessListenedSongs,
    getMostOrLessListenedSongsByAlbum,
    getViewsPerAlbum,
    getRatingPerAlbum,
    getAllUsers
}