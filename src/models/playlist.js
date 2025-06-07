const database = require('../database/config');

const getPlaylistsByUserId = (id) => {
    const sqlStatment = `
        select 
            pl.id playlist_id, pl.nome playlist, msc.id musica_id, msc.fkalbum album_id, msc.nome musica, (select count(*) from playlist_has_musica where fkplaylist = playlist_id) qtd_musica
        from playlist pl
        left join playlist_has_musica phm 
            on phm.fkPlaylist = pl.id and phm.fkUsuario = pl.fkUsuario
        left join musica msc
            on msc.id = phm.fkmusica and msc.fkalbum = phm.fkalbum
        where pl.fkUsuario = ${id}
        group by playlist_id, playlist, musica_id, album_id, musica;
    `;

    return database.execute(sqlStatment);
}

const putSongIntoPlaylist = (idPlaylist, idMusica, idUsuario, idAlbum) => {
    const sqlStatment = `
        insert into playlist_has_musica(fkplaylist, fkusuario, fkmusica, fkalbum)
        values (${idPlaylist}, ${idUsuario}, ${idMusica}, ${idAlbum})
    `;

    return database.execute(sqlStatment);
}

const getPlaylistsByUserIdForPage = (id) => {
    const sqlStatment = `
        select pl.nome playlist, pl.id idPlaylist, srcCapa capa from playlist pl
        left join playlist_has_musica phm on phm.fkPlaylist = pl.id and phm.fkUsuario = pl.fkUsuario
        left join album alb on alb.id = phm.fkalbum
        where pl.fkusuario = ${id}
        order by adicionada_em;
    `;

    return database.execute(sqlStatment);
}

const getSongsOfAPlaylistUsingId = (id) => {
    const sqlStatment = `
        select pl.nome playlist, msc.nome musica, msc.id idMusica, alb.id idAlbum, msc.duracao duracao, srcMusica, srcLRC, alb.nome album, srcCapa from playlist pl
        inner join playlist_has_musica phm on phm.fkPlaylist = pl.id and phm.fkUsuario = pl.fkUsuario
        inner join musica msc on phm.fkMusica = msc.id and phm.fkAlbum = msc.fkAlbum
        inner join album alb on alb.id = msc.fkalbum
        where pl.id = ${id}
        order by adicionada_em asc;
    `;

    return database.execute(sqlStatment);
}

const createPlaylist = (userID, nome) => {
    const sqlStatment = `
        insert into playlist (fkusuario, nome)
        values (${userID}, '${nome}')
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    getPlaylistsByUserId,
    putSongIntoPlaylist,
    getPlaylistsByUserIdForPage,
    getSongsOfAPlaylistUsingId,
    createPlaylist
}