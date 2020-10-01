const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const loginHandle = {
    true: (res, req, username, id) => {
        res.statusCode = 200;
        var token = jwt.sign({ id, username }, process.env.SECRET, {
            expiresIn: 3600 // expires in 1hr
        });
        res.setHeader('Authorization', `bearer ${token}`);
        res.json();
    },
    false: (res, req) => {
        res.statusCode = 401
        res.json()
    }
}

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user == null) {
            res.statusCode = 401;
            res.json({
                message: 'Usuário ou senha inválidos'
            });
        } else {
            await bcrypt.compare(password, user.password).then(resp => {
                loginHandle[resp](res, req, username, user._id);
            });
        }
    }
};
