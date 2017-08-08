let mongoose = require('mongoose');

let Car = mongoose.model('Car');

module.exports = app => {
	app.get('/', (req, res) => {
		Car.find({}, (err, data)=>{
			if(err){
				console.log(err);
				return;
			}else{
				res.render('index', {cars: data})
			}
		})
	});

	app.get('/cars/new', (req, res)=> {
		res.render('new');
	});

	app.get('/cars/:id', (req, res)=> {
		Car.findOne({_id: req.params.id}, (err, data)=>{
			if(err){
				console.log(err);
				return;
			}else{
				res.render('show', {car: data})
			}
		})
	});

	app.get('/cars/edit/:id', (req, res) => {
		Car.findOne({_id: req.params.id}, (err, data)=>{
			if(err){
				console.log(err);
				return;
			}else{
				res.render('edit', {car: data})
			}
		})
	});

	app.post('/cars', (req, res)=> {
		let car = new Car(req.body);
		car.save( (err, savedCar) => {
			if(err){
				console.log(car.errors);
				res.render('new', {errors: car.errors});
				// res.redirect('/cars/new')
			}else{
				console.log(savedCar);
				res.redirect('/');
			}
		});
	});

	app.post('/cars/:id', (req, res)=>{
		// Model.update({the query}, newData, options, callback(err, response))
		Car.update({_id: req.params.id}, req.body, {runValidators: true}, (err, response) =>  {
			if(err){
				Car.findOne({_id: req.params.id}, (findErr, car)=> {
					if(findErr) return console.log(findErr);
					else{
						console.log(err);
						res.render('edit', {car:car, errors: err.errors})
					}
				})
			}else{
				console.log(response);
				res.redirect('/cars/' + req.params.id);
			}
		})
	});

	app.post('/cars/destroy/:id', (req, res)=> {
		Car.remove({_id: req.params.id}, (err)=>{
			if(err) console.log(err);
			else{
				res.redirect('/');
			}
		})
	})
}
