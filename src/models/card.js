const database = require('../database/config');

const create = (photo, descricao, fkAlbum) => {
    const sqlStatment = `
        insert into cards (srcFoto, descricao, fkAlbum) values
                        ('${photo}', '${descricao}', ${fkAlbum});
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    create
}