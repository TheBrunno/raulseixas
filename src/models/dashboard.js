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
        left join musica msc on msc.fkalbum = alb.id
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
    const sqlStatment = `
        select nome, email, isADM, foto, prestigio, contadorLogins from usuario;
    `;

    return database.execute(sqlStatment);
}

const getAllAlbums = () => {
    const sqlStatment = `
        select alb.id id_album, alb.nome album, srcCapa, sum(views) views_album from album alb
        left join musica msc on msc.fkalbum = alb.id
        group by alb.id, alb.nome, srcCapa
        order by views_album desc
    `;

    return database.execute(sqlStatment);
}

const getPlaylistNumberSongsPerAlbum = () => {
    const sqlStatment = `
        select album.nome, count(*) qtd_playlists from playlist_has_musica phm
        inner join album on album.id = phm.fkalbum
        group by album.nome
        order by qtd_playlists desc;
    `;

    return database.execute(sqlStatment);
}

const getSongsMostAddedInPlaylists = () => {
    const sqlStatment = `
        select msc.nome, count(*) qtd_playlists from playlist_has_musica phm
        inner join musica msc on msc.id = phm.fkmusica
        group by msc.nome
        order by qtd_playlists desc
        limit 9;
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    getMostOrLessListenedSongs,
    getMostOrLessListenedSongsByAlbum,
    getViewsPerAlbum,
    getRatingPerAlbum,
    getAllUsers,
    getAllAlbums,
    getPlaylistNumberSongsPerAlbum,
    getSongsMostAddedInPlaylists
}