const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let CommentSchema = new Schema({
	// _user: {type:Schema.Types.ObjectId, ref: 'User'},
	name: {type:String, required:true},
	_post: {type:Schema.Types.ObjectId, ref: 'Post'},
	comment: {type:String, required:true},
}, {timestamps:true})

mongoose.model('Comment', CommentSchema);