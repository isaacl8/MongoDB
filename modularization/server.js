const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const path = require('path');

const session = require('express-session');

app.use(session({secret: 'ajewfiafj298f294fa8f 28fj 29jf a8 o'}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(6789, ()=> console.log("listening on 6789"))