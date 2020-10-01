const mongoose = require("mongoose");

const Episode = new mongoose.Schema({
	name: String,
	description: String,
	imageUrl: String,
	time: String,
    date: String,
    episodeNumber: String,
	episodeSrc: String,
	isHighlighted: Boolean,
	likes: Number,
	active: Boolean
});

module.exports = mongoose.model('Episode', Episode);