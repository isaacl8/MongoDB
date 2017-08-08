let express = require('express');

let app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

let path = require('path');

let mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/message_board')

const Schema = mongoose.Schema;

let MessageSchema = new Schema({
	// _user: {type:Schema.Types.ObjectId, ref: 'User'},
	name: {type:String, required:true},
	message: {type:String, required:true},
	comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps:true})

let CommentSchema = new Schema({
	// _user: {type:Schema.Types.ObjectId, ref: 'User'},
	name: {type:String, required:true},
	_message: {type:Schema.Types.ObjectId, ref: 'Post'},
	comment: {type:String, required:true},
}, {timestamps:true})


mongoose.model('Message', MessageSchema);

mongoose.model('Comment', CommentSchema);

require('./server/config/routes.js')(app);

app.listen(8000, () => console.log("Listening on port 8000"));
