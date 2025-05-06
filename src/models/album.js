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

const getById = (id) => {
    const sqlStatment = `select * from album
    where id = '${id}'`;

    return database.execute(sqlStatment);
}

const addDescription = (id, description) => {
    const sqlStatment = `update album set descricao = '${description}'
                            where id = ${id}`;

    return database.execute(sqlStatment);
}

module.exports = {
    albumExists,
    create,
    getByName,
    getById,
    addDescription
}