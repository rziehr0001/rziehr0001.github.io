var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CIT301');  // db name = cars4sale

var studentSchema = new mongoose.Schema({
	sid: {type: Number, required: true,min:1000, max:9999, unique: true},
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	midterm: {type: Number, required: true},
	final: {type: Number, required: true},
	major: {type: String, required: true},
	
});

module.exports = mongoose.model('Student', studentSchema);


