const controller = require('./../controllers/controller.js');

module.exports = app => {
    app.get('/', controller.index);
    app.post('/register', controller.createUser);
    app.post('/login', controller.findUser);
    app.get('/success', controller.success);
}
