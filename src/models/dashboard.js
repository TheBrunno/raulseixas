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

module.exports = {
    getMostOrLessListenedSongs,
    getMostOrLessListenedSongsByAlbum,
    getViewsPerAlbum
}