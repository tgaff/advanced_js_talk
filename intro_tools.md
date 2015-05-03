# Intro Node
## Build Tools


Outline

* NPM Tasks
* Grunt
* Bower
* Browserify


## NPM Tasks

To get started with NPM Scripts we will need a `package.json` in our project directory. Use `npm init` or your editor to create one. Then let's install our first tool.


```bash
 npm install --save-dev jshint
```

You might have something like the following:

```javascript
{
  "name": "Something",
  "version": "0.0.0",
  "description": "A Something project",
  "main": "index.js",
  "scripts": {},
  "author": "",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {
    "jshint": "^2.5.6",
  }
}

```

Next let's edit the `"scripts":` object to include our first task.


```javascript
"scripts": {
	"lint": "jshint ./example.js"
}
```

Now we have our first command setup we can run it.

```bash

npm run lint
```

Anything in your `"scripts"` object can be run using `npm run <key_of_script>`.

### Exercise

1.) Make a directory called `scripts` and create a file called `scripts/greet.js`. In the `greet.js` file use `console.log` to print out a greeting. Verify it works using `node scripts/greet.js`. Add the following to your `package.json`.

	
	```javascript`
	...
	"scripts": {
		...
		
		"prelint": "node scripts/greet.js"
	},
	...
	
	```

Now use the `npm run lint` command again. What do you see?



* [More NPM Task Resources](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
* [Scripting With Arguments](https://www.npmjs.com/package/commander)


### Grunt 

To get started with Grunt we'll need to do the following:

```javascript
npm install -g grunt-cli
```

This will allow use to run the `grunt` command for any project. Next every `grunt` driven project needs a `Gruntfile.js`, so let's create one

`Gruntfile.js`

```
module.exports = function (grunt) {
	
	grunt.registerTask("default", "Greet the world!", function () {
		console.log("HELLO WORLD!!")
	});
	
};
```

Now you can attempt to run this script by typing `grunt`.


```bash

grunt
```

However, you should get an error, because every Grunt project requires `grunt` to also be installed locally, so let's do that. For best practice you should also install `grunt-cli` locally and record it in your `devDependencies` list.


```
npm install --save grunt
```

Now we can run our `grunt` script. 

1.) Use the following code to create a greeting.txt file.

	```
	grunt.registerTask("greet", "creates a greeting.txt file", function () {
		var name = grunt.option("name") || "World";
		var text = grunt.template.process("Hello, <%= name %>", {data: {name: name });
		grunt.file.write("greeting.txt", text);
	})
	```
	
	Then run it using `grunt greet --name="john doe"

------

Alternatively, you could just install `grunt` locally and use `npm` to kickoff each `grunt task`, e.g.

```
"devDependencies": {
	...
	"grunt": "0.4.5",
    "grunt-cli": "0.1.13",
    ...
}

```

paired with some type of build command in NPM

```
"scripts": {
	"build": "npm install && grunt"
}
```

----

