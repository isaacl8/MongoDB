// Require the Express Module
const express = require('express');
// Create an Express App
const app = express();
// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
const path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

//MOONGOOSE INFO
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotes_db');
// to make a model, you can first define a schema, which is just the BLUEPRINT for a model
const UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, maxlength: 50},
    quote: { type: String, required: true, maxlength: 200 },

}, {timestamps: true });
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
const User = mongoose.model('User'); // We are retrieving this Schema from our Models, named 'User'

mongoose.Promise = global.Promise;

app.post('/quotes', (req, res) => {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  let user = new User({name: req.body.name, quote: req.body.quote});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  console.log(user);
  user.save((err) => {
// if there is an error console.log that something went wrong!
if(err) {
  console.log('something went wrong');
  res.redirect('/');
} else { // else console.log that we did well and then redirect to the root route
  console.log('successfully added a user!');
  res.redirect('/');
}
})
})

app.get('/', (req, res) => {

    res.render('index');
})


app.get('/quotes', (req, res) => {
  // Logic to grab all quotes and pass into the rendered view
  User.find({}, (err, results) =>{
    if(err) { console.log(err); }
    res.render('quotes', { users: results });
  });
});





// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
