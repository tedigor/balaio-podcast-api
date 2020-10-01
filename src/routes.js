const express = require('express');
const routes = new express.Router();

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const EpisodeController = require('./controllers/EpisodeController');
const CommentController = require('./controllers/CommentController');
const checkAuth = require('./core/middlewares/authorization');

routes.post(
    '/login',
    LoginController.login
);

// Users Routes
routes.get('/users', UserController.findAllUsers);
routes.get('/users/:id', UserController.getUserById, UserController.findUserById);
routes.post('/signin', UserController.createUser);

// Episodes Routes
routes.get('/episodes', EpisodeController.getEpisodes);
routes.get('/episodes/:id', EpisodeController.getEpisodePorId, EpisodeController.findEpisodeById);
routes.post('/private/episodes', EpisodeController.postEpisodes);
routes.get('/episodes/highlights', EpisodeController.getHighlightedEpisodes);
routes.put('/private/episodes/:id', EpisodeController.editEpisode);
routes.delete('/private/episodes/:id', EpisodeController.getEpisodePorId, EpisodeController.deleteEpisode);

// Comments Routes
routes.post('/comments', CommentController.postComment);
routes.get('/comments/:id', CommentController.getCommentByEpisode);



module.exports = routes;