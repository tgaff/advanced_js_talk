var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	_ = require("underscore"),
  	app = express();
  	

app.engine('html', function () {
	var args = Array.prototype.slice.call(arguments);
	var path = args.shift();
	var data = args.shift();
	var cb = args.pop();
	var file = fs.readFileSync(path).toString();
	var temp = _.template(file);
	cb(null, temp(data));
});

app.get('/', function(req, res){
  // use a render
  res.render("index.html", {greeting: "Hello"})
});
app.listen(3000)