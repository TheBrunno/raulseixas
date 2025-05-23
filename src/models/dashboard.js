const database = require('../database/config');

const getMostListenedSongs = () => {
    const sqlStatment = `
        select nome, views from musica
        order by views desc
        limit 9;
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    getMostListenedSongs
}