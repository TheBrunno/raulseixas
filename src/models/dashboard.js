const database = require('../database/config');

const getMostOrLessListenedSongs = (mode) => {
    const sqlStatment = `
        select nome, views from musica
        order by views ${mode}
        limit 9;
    `;

    return database.execute(sqlStatment);
}

module.exports = {
    getMostOrLessListenedSongs
}