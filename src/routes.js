const express = require('express');
const routes = new express.Router();

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

const checkAuth = require('./core/middlewares/authorization');

routes.post(
    '/login',
    LoginController.login
);

routes.get('/users', UserController.findAll);
routes.post('/users', UserController.createUser);

module.exports = routes;