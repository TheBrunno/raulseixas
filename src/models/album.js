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

const assignAlbum = (id, local) => {
    const sqlStatment = `update album set srcCapa = '${local}'
                            where id = ${id}`;

    return database.execute(sqlStatment);
}

const getAllAlbuns = () => {
    const sqlStatment = `select * from album`;

    return database.execute(sqlStatment);
}

const getAlbumByIdWithSongs = (id) => {
    const sqlStatment = `select alb.id id_album,
                                alb.nome album, 
                                alb.srcCapa capa,
                                alb.subtitulo subtitulo,
                                alb.descricao descricao,
                                alb.avaliacao avaliacao,
                                alb.descricaoAvaliacao descricaoAvaliacao,
                                msc.id id_musica, 
                                msc.nome musica, 
                                msc.duracao duracao, 
                                msc.srcMusica src_musica, 
                                msc.views views
                                
                                from album alb
                        inner join musica msc on alb.id = msc.fkAlbum
                        where alb.id = ${id}`;

    return database.execute(sqlStatment);
}

module.exports = {
    albumExists,
    create,
    getByName,
    getById,
    addDescription,
    assignAlbum,
    getAllAlbuns,
    getAlbumByIdWithSongs
}