let controller = require('../controllers/controller.js');

module.exports = (app) => {
    app.get('/', controller.getUsers);
    app.get('/new/:name', controller.createUser);
    app.get('/remove/:name', controller.removeUser);
    app.get('/:name',controller.findUser)
    
    
}
