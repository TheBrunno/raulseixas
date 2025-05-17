const database = require('../database/config');

const create = async (userId, albumId, comment) => {
    const getLastIdStatment = `
        select max(id) ultimoId from comentario
        where fkUsuario = ${userId} and fkAlbum = ${albumId};
    `;

    let actualId = await database.execute(getLastIdStatment);

    if(actualId[0].ultimoId == null){
        actualId = 1;
    }else{
        actualId = actualId[0].ultimoId+1;
    }

    const sqlStatment = `
        insert into comentario (id, fkUsuario, fkAlbum, comentario)
        values (${actualId}, ${userId}, ${albumId}, '${comment}');
    `;

    return database.execute(sqlStatment);
}

const getAllByAlbum = (fkAlbum) => {
    const sqlStatment = `
        select co.id idComentario, fkUsuario idUsuario, fkAlbum idAlbum, comentario, upvotes, downvotes, nome, foto from comentario co
        inner join usuario us on co.fkUsuario = us.id
        where co.fkAlbum = ${fkAlbum}
        order by co.id asc;
    `

    return database.execute(sqlStatment);
}

module.exports = {
    create,
    getAllByAlbum
}