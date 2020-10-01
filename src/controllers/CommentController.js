const Comment = require('../models/Comment');


const getCommentByEpisode = async (req, res) => {
    res.json(await Comment.find({ active: true, episodeId: req.params.id }));
}

const postComment = async (req, res) => {
    const { userId, episodeId, content } = req.body;

    await new Comment({
        userId,
        episodeId,
        content,
        likes: 0,
        active: true
    }).save();
    res.json({ status: 'create' });
}

module.exports = { getCommentByEpisode, postComment };
