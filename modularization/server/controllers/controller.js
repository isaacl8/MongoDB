const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

module.exports = {
	index: (req, res) => {
		if(req.session.user) console.log("The user is", req.session.user);
		Post.find({}).populate('comments').exec((err, posts)=> {
			if(err){
				console.log(err.errors);
			}else{
				console.log("All the posts are", posts);
				res.render('index', {posts:posts});
			}
		})
	},

	createUser: (req, res) => {
		User.find({name: req.body.name}, (err, user)=>{
			if(user==null){
				let user = new User(req.body);
				user.save( (err, savedUser)=>{
					if(err){
						console.log(err);
					}else{
						req.session.user = savedUser;
						res.redirect('/');
					}
				})
			}else{
				req.session.user = user;
				res.redirect('/');
			}
		})
	},

	createPost: (req, res) => {
		let post = new Post(req.body);
		// post._user = req.session.user._id;
		console.log("The created post is", post);
		post.save( (err, savedPost)=>{
			if(err) console.log(err.errors)
			else{
				res.redirect('/');
			}
		})
	},

	createComment: (req, res) => {
		Post.findOne({_id: req.params.post_id}, (findPostErr, foundPost) => {
			if(findPostErr) console.log(findPostErr.errors);
			else{
				// console.log("Line 54. Pre comment foundPost", foundPost);
				let comment = new Comment(req.body);
				comment._post = foundPost._id;
				comment.save( (saveCommentErr, savedComment) => {
					if(saveCommentErr) console.log(savedCommentErr.errors)
					else{
						// console.log("Line 60. Pre comment push foundPost", foundPost);
						foundPost.comments.push(savedComment);
						foundPost.save( (savedPostErr, savedPost) => {
							if(savedPostErr) console.log(savedPostErr)
							else{
								// console.log("The saved post is", savedPost);
								res.redirect('/');
							}
						})

					}
				})
			}
		})
	},
}