const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please provide your first name!']
	},
	lastName: {
		type: String,
		required: [true, 'Please provide your last name!']
	},
	email: {
		type: String,
		required: [true, 'Please provide your email!'],
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: [true, 'Please provide a password']
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
