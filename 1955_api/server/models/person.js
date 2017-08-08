const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let PersonSchema = new Schema({
	name: {type:String, required:true}
}, {timestamps:true})

mongoose.model('Person', PersonSchema);
