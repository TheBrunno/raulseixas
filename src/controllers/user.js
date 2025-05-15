const userModel = require('../models/user');

async function cadastrar(req, res) {
    var nome = req.body.name;
    var email = req.body.email;
    var senha = req.body.password;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        const existUser = await userModel.existUser(email);
        if (existUser.length >= 1) {
            return res.status(403).json("Usuário já existe!");
        }

        userModel.register(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

async function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.password;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        userModel.login(email, senha)
            .then((result) => {
                if (result.length == 1) {
                    res.json({ 
                        id: result[0].id, 
                        nome: result[0].nome, 
                        email: result[0].email,
                        contadorLogins: result[0].contadorLogins,
                        foto: result[0].foto,
                        prestigio: result[0].prestigio,
                        isADM: result[0].isADM
                    });
                } else {
                    res.status(403).json("Usuário ou senha incorreta!");
                }
            }).catch((error) => {
                res.status(500).json(error.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar,
    autenticar
}