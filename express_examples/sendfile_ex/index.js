var express = require('express'),
	path = require('path'),
  	app = express();


// our special little middleware
app.use(function (req, res, next) {
	console.log("running");
	res.sendOps = {
						root: path.join(__dirname, "views")
					};
	res.sendHTML = function (fname, cb) {
		if (path.extname(fname) !== '.html') {
			fname += '.html';
		}
		res.sendFile(fname, res.sendOps, cb || function (err) {
			if (err) {
				res.status(err.status).end();
			} else {
				console.log("Sent:", fname)
			}
		});
	};
	next();
})

app.get('/', function(req, res){
  res.sendHTML("index")
});

app.listen(3000)
