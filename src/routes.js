const express = require('express');
const routes = new express.Router();

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const EpisodeController = require('./controllers/EpisodeController');
const checkAuth = require('./core/middlewares/authorization');

routes.post(
    '/login',
    LoginController.login
);

// Users Routes
routes.get('/users', UserController.findAllUsers);
routes.post('/signin', UserController.createUser);

// Episodes Routes
routes.get('/episodes', EpisodeController.getEpisodes);
routes.post('/private/episodes', EpisodeController.postEpisodes);
routes.get('/episodes/highlights', EpisodeController.getHighlightedEpisodes);
routes.put('/private/episodes/:id', EpisodeController.editEpisode);
routes.delete('/private/episodes/:id', EpisodeController.getEpisodePorId, EpisodeController.deleteEpisode);

module.exports = routes;