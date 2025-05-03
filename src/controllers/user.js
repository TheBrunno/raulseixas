const userModel = require('../models/user');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await userModel.existUser(email);
    if(existUser.length >= 1){
        return res.status(403).send("Usuário já existe!");
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

module.exports = {
    register
}