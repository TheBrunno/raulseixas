const database = require('../database/config');

const register = (name, email, password) => {
    const sqlStatment = `insert into usuario(nome, email, senha, isADM) 
                        values ('${name}','${email}','${password}', 0)`;

    return database.execute(sqlStatment);
}

const existUser = (email) => {
    const sqlStatment = `select nome from usuario
                        where email = '${email}'`;

    return database.execute(sqlStatment);
}
module.exports = {
    register,
    existUser
};