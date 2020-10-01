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
routes.get('/private/episodes', EpisodeController.getAllEpisodes);
routes.get('/episodes/highlights', EpisodeController.getHighlightedEpisodes);
routes.get('/episodes/:id', EpisodeController.getEpisodePorId, EpisodeController.findEpisodeById);

routes.post('/private/episodes', EpisodeController.postEpisodes);
routes.put('/private/episodes/:id', EpisodeController.editEpisode);
routes.put('/private/episodes/:id/highlight', EpisodeController.getEpisodePorId, EpisodeController.updateHighlight);
routes.put('/private/episodes/:id/activate', EpisodeController.getEpisodePorId, EpisodeController.activeEpisode);
routes.delete('/private/episodes/:id', EpisodeController.getEpisodePorId, EpisodeController.deleteEpisode);

// Comments Routes
routes.post('/comments', CommentController.postComment);
routes.get('/comments/:id', CommentController.getCommentByEpisode);



module.exports = routes;