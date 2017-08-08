const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let PostSchema = new Schema({
	// _user: {type:Schema.Types.ObjectId, ref: 'User'},
	name: {type:String, required:true},
	content: {type:String, required:true},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps:true})

mongoose.model('Post', PostSchema);