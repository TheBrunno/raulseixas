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
    const sqlStatment = `select id, nome, email, contadorLogins, foto, prestigio, isADM from usuario
                        where email = '${email}' and senha = '${password}'`

    const result = await database.execute(sqlStatment);

    if(result.length == 1){
        let sqlStatment2 = `update usuario set contadorLogins = ${result[0].contadorLogins+1}
                            where id = ${result[0].id}`;
        database.execute(sqlStatment2);
    }

    return result;
}

const upload = async (id, file) => {
    const sqlMessage = `
        update usuario set foto = '${file}' where id = ${id}
    `;

    return database.execute(sqlMessage);
}

module.exports = {
    register,
    existUser,
    login,
    upload
};