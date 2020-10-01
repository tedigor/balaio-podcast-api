const mongoose = require("mongoose");

const User = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	role: 'ADMIN' | 'DEFAULT',
	active: Boolean
});

module.exports = mongoose.model("User", User);