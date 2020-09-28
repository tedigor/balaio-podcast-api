const mongoose = require("mongoose");

const Episode = new mongoose.Schema({
    _id: string,
	name: string,
	description: string,
	imageUrl: string,
	episodeSrc: string,
	isHighlighted: boolean,
	likes: number,
	active: boolean
});

module.exports = mongoose.model('Episode', Episode);