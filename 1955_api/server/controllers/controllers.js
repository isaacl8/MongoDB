const mongoose = require('mongoose');

const Person = mongoose.model('Person');
module.exports = {
    showAll: (req,res) => {
       Person.find({}, (err,people) => {
           if(err){
               console.log(err);
           } else {
               res.json(people);
           };
       });
    },

    add: (req,res) => {
        let newPerson = new Person({name: req.params.name});
        newPerson.save((err, newPerson) =>{
            if(err){
                console.log(err);
            } else {
                console.log(newPerson);
                res.redirect('/');
            }
        })
    },

    remove: (req,res) => {
        Person.findOne({name: req.params.name}, (err,person) =>{
            if (err) {
                console.log('Person can not be removed');
            } else {
                person.remove();
                res.redirect('/');
            }
        })
    },

    showUser: (req,res) => {
        Person.findOne({name: req.params.name}, (err, person) => {
            if (err) {
                console.log('Cannot find user show page');
            } else {
                res.json(person);
            }
        })

    },

}
