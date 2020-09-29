const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
	userId: DBref,
	episodeId: DBref,
	content: String,
	likes: Number,
	active: Boolean

});

module.exports = mongoose.model('Comment', Comment);