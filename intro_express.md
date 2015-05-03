#Intro to Express

##Example web server with Node
The below is to demonstrate how Node can be used to create network applications. You can specify exactly how the behavior is.

**server.js**

```js
var http = require("http");

function doStuff(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello World");
  res.end();
}

var server = http.createServer(doStuff);

server.listen(3000);

```
If we copy this into our clipboard we can run it directly in node:

```
pbpaste | node
```


different ways to terminate a connection

```
curl -i localhost:3000
```

We notice a few different things in the header

```
keep alive = persistent encoding
transfer encoding = chunked # streaming!

```	

## Simple File Server

Let's take this a step further to create a simple file server in node.


```js
var http = require("http");
var fs = require('fs');
var path = require('path');

function doStuff(req, res) {
  var dirs, headers, status, fsData, resBuffer;
  status = 200;
  headers = {
  	"Content-Type": "text/html; charset=UTF-8",
  	"Transfer-Encoding": "chunked"
  };
  
  try {
    console.log(req.url)
  	fsData = fs.statSync(path.join(process.cwd(), req.url))
  } catch (e) {
  	status = 404;
  	res.writeHead(status, headers)
  	res.end("NOT FOUND")
  	return undefined;
  } 
  if (fsData.isDirectory()) {
  	dirs = fs.
  			readdirSync(path.join(process.cwd(), req.url)).
  			map(function (f) {
  				var fname = path.join(process.cwd(), req.url, f);
  				return f + (fs.statSync(fname).isDirectory() ?  "/" : "");
  			});
  			
  	if ( req.url === "/" && dirs.indexOf("index.html") !== -1 )  {
   		headers.Location = "/index.html";
   		status = 302;
   		dirStr = "";
   	} else {
	  	resBuffer = dirs.reduce(function (prev, dir) {
	  		return prev + "<div><a href='" +path.join(req.url, dir) +"'>" +dir + "</a></div>";
	  	}, "");
	  	resBuffer = "<!DOCTYPE html><html><head></head><body>" + 
	  			  resBuffer +
	  			  "</body></html>"; 
   	}
  
  } else { 
  	console.log(req.url);
  	resBuffer = fs.readFileSync(path.join(process.cwd(), req.url));
  	if (!path.extname(req.url) === ".html") {
  		headers["Content-Type"] = "text/plain";
  	}
  }
  res.writeHead(status, headers);
  res.end(resBuffer);

}

var server = http.createServer(doStuff);

server.listen(3000);
```


##Our first Express App

###Setting up a project
1. Create a new folder for use with the project using `mkdir node_calculator`, and cd into `cd node_calculator`

First we want to start a new project by going `npm init`
Follow the instructions, clicking `enter` through the statements. you many want to specify a version number, but most default options should 
be fine. It will also specify an initial file, usually index.js to use



```
npm install --save express
touch index.js
```

###Installing nodemon
`npm install -g nodemon`

If we just ran `node nameOfFile.js`, node will not update its responses after the server has made.

###index.js

The following example, shows a few different ways to get routes working in Node. A `route` is a combination of a url pattern + HTTP Verb (get, post, delete, update)

```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello delmer');
});

app.get("/greet/:name/:lastname", function(req, res) {
  res.send("Hello " + req.params.name + " " + req.params.lastname)
})

app.get("/multiply/:x/:y", function(req, res) {
  res.send("The answer is: " + (req.params.x * req.params.y));
})

app.get("/add/:x/:y", function(req, res) {
  res.send("The answer is: " + (parseInt(req.params.x) + parseInt(req.params.y)));
})

app.listen(3000);
```
In addition to having routes where different portions of the url are diffrent parameters, we can use the generic string of the url in our route logic.

```js
app.get("/add/*", function(req, res) {
  var myParams = req.params[0].split("/")
  var result = myParams.reduce( function(total, num){ return total + parseInt(num) }, 0)
  res.send("The answer is  " + result);
})
```
This will give you a url like `http://localhost:3000/add/5/3/3/2/3` and give you an answer.


###Running your Project
If `"main": "index.js"` is in your `package.json`, then running `nodemon` will automatically start your project and serving your file.
