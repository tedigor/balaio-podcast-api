const mongoose = require('mogoose');


const Page = new mongoose.Schema({
	data: [],
	empty: boolean,
	first: boolean,
	last: boolean,
	number: number,
	numberOfElements: number,
	pageable: string,
	size: number,
	sort: number,
	totalElements: number,
	totalPages: number
});

module.exports = mongoose.model('Page', Page);