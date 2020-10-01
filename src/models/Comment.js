const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
	userId: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	episodeId: [{ type: mongoose.Schema.ObjectId, ref: 'Episode' }],
	content: String,
	likes: Number,
	active: Boolean

});

module.exports = mongoose.model('Comment', Comment);