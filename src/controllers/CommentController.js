const Comment = require('../models/Comment');


const getCommentByEpisode = async (req, res) => {
    res.json(await Comment.find({ episodeId: req.params.id }));
}

const postComment =  async (req, res) => {
    const {userId, episodeId, content} = req.body;
    likes = 0;
    active = true;

    await new Comment({userId, episodeId, content, likes, active}).save();
    res.json({status: 'create'});
}
