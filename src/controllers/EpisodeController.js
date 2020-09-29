const express = require('express');
const routes = new express.Router();
const Episode = require('../models/Episode');



// '<iframe src="https://open.spotify.com/embed-podcast/show/4uAA0AKp3wMuJ227Pfgv9k" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'

const getEpisodePorId = async (req, res, next) => {
    try {
      let episode = await Episode.findById(req.params.id);
      if (episode === null) {
        res.status(404).json({erro: 'Não foi encontrado um episódio com o id informado'});
      } else {
        req.episode = episode;
        next();
      }
    } catch (erro) {
      res.status(500).json({erro: 'O id informado não é válido'});
    }
  };

routes.get('/private/episodes', async (req, res) => {
    res.json(await Episode.find());
});

routes.post('/private/episodes', async (req, res) => {
    const {name, description, imageUrl, episodeSrc, isHighlighted} = req.body;
    likes = 0;
    active = true;

    await new Episode({name, description, imageUrl, episodeSrc, isHighlighted, likes, active}).save();
    res.status(201).json({'status': 'sucesso'});
});

module.exports = routes;