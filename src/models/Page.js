const mongoose = require('mogoose');


const Page = new mongoose.Schema({
	data: Array,
	empty: Boolean,
	first: Boolean,
	last: Boolean,
	number: Number,
	numberOfElements: Number,
	pageable: String,
	size: Number,
	sort: Number,
	totalElements: Number,
	totalPages: Number
});

module.exports = mongoose.model('Page', Page);