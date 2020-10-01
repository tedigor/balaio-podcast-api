const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
	userName: String,
	episodeId: [{ type: mongoose.Schema.ObjectId, ref: 'Episode' }],
	content: String,
	likes: Number,
	active: Boolean

});

module.exports = mongoose.model('Comment', Comment);