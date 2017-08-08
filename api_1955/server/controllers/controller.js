let mongoose = require('mongoose');
const User = mongoose.model('User');
//CRUD verbNoun
module.exports = {
    getUsers: (req,res) => {
        User.find({}, (err,people) => {
            if(err){
                console.log('Can\t find Users');
            }else {
                res.json(people);
            }
        })
    },
    createUser: (req,res) => {
        let newUser = new User ({name: req.params.name});
        newUser.save((err,newUser) => {
            if (err) {
                console.log('did not create a new user');
            }else {
                res.json(newUser);
            }
        })
    },
    removeUser: (req,res) => {
        User.findOne({name: req.params.name},(err,remove) => {
            if(err){
                console.log('did not remove the user')
            }else {
                remove.remove();
                res.redirect('/');
            }
        })
    },
    findUser: (res,req) => {
        User.findOne({name:req.params.name}, (err, theUser) =>{
            if(err){
                console.log('User not found');
            }else {
                res.json(theUser);
            }
        })
    }
}
