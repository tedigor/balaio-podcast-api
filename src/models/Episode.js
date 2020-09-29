const mongoose = require("mongoose");

const Episode = new mongoose.Schema({
	name: String,
	description: String,
	imageUrl: String,
	episodeSrc: String,
	isHighlighted: Boolean,
	likes: Number,
	active: Boolean
});

module.exports = mongoose.model('Episode', Episode);