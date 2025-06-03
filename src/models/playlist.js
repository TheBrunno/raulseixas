const database = require('../database/config');

const getPlaylistsByUserId = (id) => {
    const sqlStatment = `
        select pl.nome playlist, count(fkmusica) qtd_musica from playlist pl
            left join playlist_has_musica phm 
                on phm.fkPlaylist = pl.id and phm.fkUsuario = pl.fkUsuario
            where pl.fkUsuario = ${id}
            group by pl.id, pl.nome;
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    getPlaylistsByUserId
}