const Episode = require('../models/Episode');


const getEpisodePorId = async (req, res, next) => {
  try {
    let episode = await Episode.findById(req.params.id);
    if (episode === null) {
      res.status(404).json({ erro: 'Não foi encontrado um episódio com o id informado' });
    } else {
      req.episode = episode;
      next();
    }
  } catch (erro) {
    res.status(500).json({ erro: 'O id informado não é válido' });
  }
};

const getEpisodes = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  try {
    const episodes = await Episode.find({ active: true })
      .limit(size * 1)
      .skip((page - 1) * size)
      .exec();

    const count = await Episode.countDocuments();

    res.json({
      data: episodes,
      totalPages: Math.ceil(count / size),
      currentPage: page
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getHighlightedEpisodes = async (req, res) => {
  res.json(await Episode.find({ isHighlighted: false }));
};

const postEpisodes = async (req, res) => {
  const { name, description, imageUrl, episodeSrc, isHighlighted } = req.body;
  likes = 0;
  active = true;

  await new Episode({ name, description, imageUrl, episodeSrc, isHighlighted, likes, active }).save();
  res.status(201).json({ 'status': 'sucesso' });
}

const editEpisode = async (req, res) => {
  const id = req.params.id;
  await Episode.findOneAndUpdate({ _id: id }, { ...req.body });
  res.send('O episódio foi atualizado!');
}

const deleteEpisode = async (req, res) => {
  req.episode.active = false;
  await req.episode.save();
  res.send('O episódio foi deletado!');
}


module.exports = { getEpisodes, getHighlightedEpisodes, postEpisodes, editEpisode, getEpisodePorId, deleteEpisode };