const database = require('../database/config');

const getAllAlbums = () => {
    const sqlStatment = `
        select alb.id id_album, alb.nome album, srcCapa, sum(views) views_album, alb.subtitulo subtitulo from album alb
        inner join musica msc on msc.fkalbum = alb.id
        where srcCapa is not null and alb.nome is not null
        group by alb.id, alb.nome, srcCapa
        order by views_album desc;
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    getAllAlbums
}