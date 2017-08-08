const controller = require('./../controllers/controller.js');

module.exports = app => {
	// app.HTTP_VERB(url, callback);
	app.get('/', controller.index);
	app.post('/users', controller.createUser);
	app.post('/posts', controller.createPost);
	app.post('/comments/:post_id', controller.createComment);
}
