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

const login = async (email, password) => {
    const sqlStatment = `select id, nome, email, loginsCount from usuario
                        where email = '${email}' and senha = '${password}'`

    const result = await database.execute(sqlStatment);

    if(result.length == 1){
        let sqlStatment2 = `update usuario set loginsCount = ${result[0].loginsCount+1}
                            where id = ${result[0].id}`;
        database.execute(sqlStatment2);
    }

    return result;
}
module.exports = {
    register,
    existUser,
    login
};