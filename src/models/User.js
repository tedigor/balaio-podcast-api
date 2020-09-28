const mongoose = require("mongoose");

const User = new mongoose.Schema({
    _id: string,
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	name: string,
	role: 'ADMIN' | 'DEFAULT',
	active: boolean
});

module.exports = mongoose.model("User", User);