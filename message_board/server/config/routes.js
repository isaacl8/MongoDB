let mongoose = require('mongoose');

let Message = mongoose.model('Message');

let Comment = mongoose.model('Comment');

module.exports = app => {
	app.get('/', (req, res) => {
	    Message.find({}).populate('comment').exec((err, data) => {
	        if (err) {
	            console.log(err);
	        } else {
				console.log("the data is", data)
	            res.render('index', {messages: data})
	        }
	    })
	});

	app.post('/createmessage', (req,res) =>{
		let message = new Message(req.body);
		console.log(message);
		message.save((err,savedMessage) => {
			if(err) {
			  console.log('something went wrong');
			} else { // else console.log that we did well and then redirect to the root route
			  console.log(savedMessage);
			  res.redirect('/');
			}

		});
	});
	app.post('/comments/:message_id',(req, res) => {
		Message.findOne({_id: req.params.message_id},(err, foundMessage) => {
			if(err) {
				console.log('cant find message');
				res.redirect('/');
			}else {
		        let comment = new Comment(req.body);
		        comment._message = foundMessage._id;
		        comment.save((err) => {
				if(err) {
					console.log(err)
					console.log('Error');
				}else {
					console.log("SUCCESSFUL COMMENT")
					foundMessage.comment.push(comment);
					foundMessage.save((err)=>{
						if(err){
							console.log("cant push to array")
						}else {
							res.redirect('/');
						}
					})

				}
	           });
			}
		});
	})
}
