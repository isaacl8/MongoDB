const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

module.exports = {
    index: (req,res) => {
        res.render('index');
    },
    createUser: (req,res) => {
        let newUser = User(req.body);
        console.log('Created a new', newUser);
        newUser.save((err, newUser) =>{
            if(err){
                console.log(err);
                res.redirect('/');
            }else {
                console.log(newUser)
                res.json(newUser)
            }
        });
    },
    findUser: (req,res) => {
        User.findOne({email: req.body.email}, (err, foundUser) =>{
            if(err){
                console.log('Can\'t find the user')
                res.redirect('/');
            }else {
                // compares the input password to the db pass
                if(bcrypt.compareSync(req.body.password, foundUser.password)){
                    res.json(foundUser);
                }else {
                console.log('Invalid password')
            }
            }

        })
    },
    success: (req,res) => {
        res.json('/')
    }

}
