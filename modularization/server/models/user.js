const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: {type:String, required:true}
}, {timestamps:true})

mongoose.model('User', UserSchema);