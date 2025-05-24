const database = require('../database/config');

const register = (fkUsuario, fkAlbum, avaliacao) => {
    const sqlStatment = `
        insert into avaliacao (fkUsuario, fkAlbum, avaliacao) values
                        (${fkUsuario}, ${fkAlbum}, ${avaliacao});
    `;

    return database.execute(sqlStatment);
}

const verify = (fkUsuario, fkAlbum) => {
    const sqlStatment = `
        select * from avaliacao
        where fkusuario = ${fkUsuario} and fkalbum = ${fkAlbum}
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    register,
    verify
}