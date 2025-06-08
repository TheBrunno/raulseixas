const database = require('../database/config');

const albumExists = (fkAlbum) => {
    const sqlStatment = `select nome from album
                            where id = ${fkAlbum}`;

    return database.execute(sqlStatment);
}

const create = (nome, descricao, subtitulo, descricaoAvaliacao) => {
    const sqlStatment = `insert into album(nome, descricao, subtitulo, descricaoAvaliacao)
                            values ('${nome}', '${descricao}', '${subtitulo}', '${descricaoAvaliacao}')`;

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
    const sqlStatment = `select id, nome, srcCapa from album`;

    return database.execute(sqlStatment);
}

const getAlbumByIdWithSongs = (id, adm) => {
    const admPage = adm ? '' : ' and msc.duracao is not null and msc.srcMusica is not null'; 
    const sqlStatment = `select alb.id id_album,
                                alb.nome album, 
                                alb.srcCapa capa,
                                alb.subtitulo subtitulo,
                                alb.descricao descricao,
                                round((select avg(avaliacao) from avaliacao where fkalbum = alb.id group by fkalbum), 1) avaliacao,
                                alb.descricaoAvaliacao descricaoAvaliacao,
                                msc.id id_musica, 
                                msc.nome musica, 
                                msc.duracao duracao, 
                                msc.srcMusica src_musica,
                                msc.srcLRC src_lrc,
                                msc.views views
                                
                                from album alb
                        left join musica msc on alb.id = msc.fkAlbum
                        where alb.id = ${id}${admPage}
                        order by views desc`;

    return database.execute(sqlStatment);
}

const editInfos = (id, titulo, subtitulo, descricao, descricao_avaliacao) => {
    const sqlStatment = `
        update album 
        set
        nome = '${titulo}',
        subtitulo = '${subtitulo}',
        descricao = '${descricao}',
        descricaoAvaliacao = '${descricao_avaliacao}'
        where id = ${id};
    `;

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
    getAlbumByIdWithSongs,
    editInfos
}