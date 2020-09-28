const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
    _id: string,
	userId: DBref,
	episodeId: DBref,
	content: string,
	likes: number,
	active: boolean

});

module.exports = mongoose.model('Comment', Comment);