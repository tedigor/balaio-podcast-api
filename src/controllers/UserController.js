
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mapCodeError = {
    11000: 'User already exists'
}

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

module.exports = {
    async findAll(req, res) {
        const users = await User.find()
        res.json(users.map(user => {
            return {
                id: user.id,
                username: user.username
            }
        }));
    },

    async createUser(req, res) {
        const { username, password } = req.body;

        const errorsResponse = {
            message: 'Creation failed',
            status: 400,
            errors: []
        };
        handlePassworLength(password, errorsResponse);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword
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
}

