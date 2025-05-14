const database = require('../database/config');

const create = (photo, descricao, fkAlbum) => {
    const sqlStatment = `
        insert into cards (srcFoto, descricao, fkAlbum) values
                        ('${photo}', '${descricao}', ${fkAlbum});
    `;

    return database.execute(sqlStatment);
}

const getAllCardsFromIdAlbum = (fkAlbum) => {
    const sqlStatment = `
        select * from cards
        where fkAlbum = ${fkAlbum}
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    create,
    getAllCardsFromIdAlbum
}