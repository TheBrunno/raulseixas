const userModel = require('../models/user');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await userModel.existUser(email);
    if(existUser.length >= 1){
        return res.status(403).json("Usuário já existe!");
    }

    userModel.register(name, email, password)
        .then((result) => {
                res.json(result);
            }
        ).catch((error) => {
                res.status(500).json(error.sqlMessage);
            }
        );
}

const login = async (req, res) => {
    const { email, password } = req.body;

    userModel.login(email, password)
        .then((result) => {
            if(result.length == 1){
                res.json({ nome: result[0].nome, email: result[0].email });
            }else{
                res.status(403).json("Usuário ou senha incorreta!");
            }
        }).catch((error) => {
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    register,
    login
}