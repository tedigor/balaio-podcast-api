
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mapCodeError = {
    11000: 'User already exists'
}


const getUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user === null) {
            res.status(404).json({ erro: 'Não foi encontrado um usuário com o id informado' });
        } else {
            req.user = user;
            next();
        }
    } catch (erro) {
        res.status(500).json({ erro: 'O id informado não é válido' });
    }
};

const formatErrors = (errors) => {
    const errorsArr = [];
    const keys = Object.keys(errors);
    for (let i = 0; i < keys.length; i++) {
        const { path, message } = errors[keys];
        errorsArr.push({
            field: path,
            message: message
        });
    }
    return errorsArr;
}

const handlePassworLength = (password, errorsResponse) => {
    if (password.length == 0 || password === '') {
        errorsResponse.errors.push({
            name: 'InvalidPassword',
            message: 'Password must not be blank',
            field: 'password'
        });
    }
}

const handleDatabaseErrors = (err, errorsResponse) => {
    errorsResponse.errors.push({
        name: err.name,
        message: mapCodeError[err.code],
    });
}

const findAllUsers = async (req, res) => {
    const users = await User.find({ active: true });
    res.json(users.map(user => {
        return {
            id: user.id,
            username: user.username,
            role: user.role
        }
    }));
}

const createUser = async (req, res) => {
    const { username, password, name } = req.body;
    active = true;
    const errorsResponse = {
        message: 'Creation failed',
        status: 400,
        errors: []
    };
    handlePassworLength(password, errorsResponse);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        password: hashedPassword,
        name,
        role: 'DEFAULT'
    }).catch(err => {
        handleDatabaseErrors(err, errorsResponse);
    });

    if (errorsResponse.errors.length > 0) {
        res.statusCode = 400
        res.json(errorsResponse);
    } else {
        res.statusCode = 201;
        res.json({ _id: newUser._id, username: newUser.username });
    }

}

const findUserById = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
}


module.exports = { findAllUsers, createUser, getUserById, findUserById };

