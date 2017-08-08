const controller = require('./../controllers/controllers.js');

module.exports = app => {
    app.get('/', controller.showAll);
    app.get('/new/:name/', controller.add);
    app.get('/remove/:name/', controller.remove);
    app.get('/:name', controller.showUser);
}
