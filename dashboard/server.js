let express = require('express');

let app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

let path = require('path');

let mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/car_db')

let CarSchema = new mongoose.Schema({
	year: {type: String, required:true},
	make: {type:String, required: true},
	model: {type: String, required: true},
	image: {type:String}
}, {timestamps:true});

mongoose.model('Car', CarSchema);

require('./server/config/routes.js')(app);

app.listen(8000, () => console.log("Listening on port 8000"));
