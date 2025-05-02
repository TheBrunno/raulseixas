const mysql = require('mysql2');

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

function execute(statement) {
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection(mySqlConfig);
        connection.connect();
        connection.query(statement, function (error, result) {
            connection.end();
            if (error) {
                reject(error);
            }
            console.log(result);
            resolve(result);
        });
        connection.on('error', function (error) {
            return ("ERRO NO MySQL SERVER: ", error.sqlMessage);
        });
    });
}

module.exports = {
    execute
};