const database = require('../database/config');

const albumExists = (fkAlbum) => {
    const sqlStatment = `select nome from album
                            where id = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

const create = (name) => {
    const sqlStatment = `insert into album(nome)
                            values ('${name}')`;

    return database.execute(sqlStatment);
}

const getByName = (name) => {
    const sqlStatment = `select * from album
                            where nome = '${name}'`;

    return database.execute(sqlStatment);
}

module.exports = {
    albumExists,
    create,
    getByName
}