const Comment = require('../models/Comment');
const User = require('../models/User');
const Episode = require('../models/Episode');


const getCommentByEpisode = async (req, res) => {
    const comments = await Comment.find({ active: true, episodeId: req.params.id });
    res.json(comments);
}

const postComment = async (req, res) => {
    const { userName, episodeId, content } = req.body;

    await new Comment({
        userName,
        episodeId,
        content,
        likes: 0,
        active: true
    }).save();
    res.json({ status: 'create' });
}

module.exports = { getCommentByEpisode, postComment };
