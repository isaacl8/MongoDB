// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jul_17_mongoose');

mongoose.Promise = global.Promise;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({
    extended: true
}));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

let userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 6
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 1,
        max: 150
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

mongoose.model('User', userSchema);

let User = mongoose.model('User');

app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            console.log("***********************")
            console.log(users);
            res.render('index', {
                users: users
            });

        }
    })
})

app.get('/:id', (req, res) => {
    console.log(req.params.id);
    User.findOne({
        _id: req.params.id
    }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            // user.remove()
            res.render('show', {
                user: user
            })
        }
    })
})
// Add User Request
app.post('/users', function(req, res) {
    // { name: 'Name', age: '55' }
    let user = new User(req.body);
    // user.save(callback(The Error if Any, The object that was just saved))
    user.save((err, savedUser) => {
        if (err) {
            console.log(err);
            return res.redirect('/')
        } else {
            console.log(savedUser);
            return res.redirect('/');
        }
    });

})
// Setting our Server to Listen on Port: 8000
app.listen(6789, function() {
    console.log("listening on port 6789");
})
