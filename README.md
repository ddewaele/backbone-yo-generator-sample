# Introduction

Important : This is very much a work in progress and I'm not an expert on the matter. This is just me writing down my experiences with Yeoman / Backbone and RequireJS.

This repository contains a simple Backbone.JS project that was built using the yeoman backbone generator.
I'm pretty new to yeoman and single-page javascript development so I welcome any pull requests.

The goal is to provide a quick-start to people who don't have a lot of javascript frontend experience.

# Yeoman

Yeoman is a set of tools for automating your development workflow, primarily used for frontend javascript applications. 
For more information about Yeoman, please goto http://yeoman.io/ and read the getting started guide.

# Installing

Installing the tools is pretty simple. Just execute the following command to install yo, the scaffolding tool that comes with yeoman.

	npm install -g yo
	
You can also install so-called generators that allow you to bootstrap a project for a specific technology really quickly.	
	
	npm install -g generator-webapp
	npm install -g generator-backbone
	npm install -g generator-ember

These generators can be found on Github

- https://github.com/yeoman/generator-backbone
- https://github.com/yeoman/generator-ember

# The backbone generator

The backbone generator can be started with the following command :

	yo backbone [app-name]

If you want ot use handlebars as th templating framework (instead of the default Underscoe Templates), execute the command below:

	yo backbone --template-framework=handlebars
	bower install --save handlebars

This will create the following files:

	-rw-r--r--   1 ddewaele  staff    296 Nov 12 10:42 bower.json
	-rw-r--r--   1 ddewaele  staff    974 Feb  6 23:47 package.json
	drwxr-xr-x  10 ddewaele  staff    340 Feb  6 23:47 app
	-rw-r--r--   1 ddewaele  staff  12582 Feb  6 23:47 Gruntfile.js
	drwxr-xr-x   6 ddewaele  staff    204 Feb  6 23:47 test


If there's an update available you'll be notified

	-----------------------------------------
	Update available: 1.2.8 (current: 0.9.2)
	Run npm update -g bower to update
	-----------------------------------------

## Scaffolding

Typical workflow commands:

	yo backbone 
	yo backbone:model blog
	yo backbone:collection blog
	yo backbone:router blog
	yo backbone:view blog
	grunt serve

# Building the webapp

Execute the following command to have grunt build and package up the webapp in the `dist` folder.

	grunt build
	
# Building on the base components 

Now that we have a basic directory structure in place, it's time to add some business logic to our application
and wire everything together. We'll start by looking at the bootstrap javascript file called `main.js`.

## The application bootstrap file

The main.js file is responsible for bootstrapping our app. 

- The first part of the file takes care of configuring require.js 
- Ater that it imports a single javascript file called app.js, that it initializes.

Here's what the file looks like:

	/*global require*/
	'use strict';
	
	require.config({
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				deps: [
					'underscore',
					'jquery'
				],
				exports: 'Backbone'
			},
			bootstrap: {
				deps: ['jquery'],
				exports: 'jquery'
			},
			handlebars: {
				exports: 'Handlebars'
			}
		},
		paths: {
			jquery: '../bower_components/jquery/jquery',
			backbone: '../bower_components/backbone/backbone',
			underscore: '../bower_components/underscore/underscore',
			bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
			handlebars: '../bower_components/handlebars/handlebars'
		}
	});
	
	require(['app'], function (App) {
		// Initialize our application.
		App.initialize();
	});


The require call loads up our app.js script, and intitializes the object that the app.js script returns 

## The application file

The primary application script (the one that got bootstrapped by the main application file) is called `app.js` and imports whatever dependencies we need (Backbone, our router, .....) and initializes our router object.

The dependencies are called "modules" and they define a well-scoped object that avoids polluting the global namespace.

The first parameter we pass on to the define function is an `array` of `dependency names`.
The second paramter we pass on to the define function is a `definition function`.

RequireJS ensures that this function is called when all other dependencies are resolved. Each dependency name returns a single object that is made available as an argument of the `definition function`

	define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'routes/blog',
	  'routes/product' 
	], function($, _, Backbone, BlogRouter,ProductRouter){
	  var initialize = function(){
		BlogRouter.initialize();
	  }
	
	  return {
		initialize: initialize
	  };
	});


## Our router

On the first things we need to provide in our application is a couple of routes or URLs that the user can access.
In this example, I'm going to setup 2 routes:

- one for displaying locations,
- one for looking at the details of a location.


<li><a href="#products">Products</a></li>


# Issues

Here are some of the issues I encountered while executing the commands:

## The following issue occured when executing the yo backbone command

	I'm all done. Running bower install for you to install the required dependencies. If this fails, try running the command yourself.
	
	
	bower cloning git://github.com/visionmedia/mocha.git
	bower cached git://github.com/visionmedia/mocha.git
	bower fetching mocha
	bower cloning git://github.com/chaijs/chai.git
	bower cached git://github.com/chaijs/chai.git
	bower fetching chai
	bower checking out chai#1.8.1
	bower copying /Users/ddewaele/.bower/cache/chai/7333909bbdb6ee7aaa74fd94a5175994
	bower error Could not find tag satisfying: mocha#~1.14.0
	
	There were errors, here's a summary of them:
	- mocha Could not find tag satisfying: mocha#~1.14.0
	The tag ~1.14.0 could not be found within the repository
	
	events.js:74
			throw TypeError('Uncaught, unspecified "error" event.');
				  ^
	TypeError: Uncaught, unspecified "error" event.
		at TypeError (<anonymous>)
		at MochaGenerator.EventEmitter.emit (events.js:74:15)
		at done (/usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/lib/base.js:293:16)
		at /usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/node_modules/async/lib/async.js:232:13
		at /usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/node_modules/async/lib/async.js:113:21
		at /usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/node_modules/async/lib/async.js:24:16
		at /usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/node_modules/async/lib/async.js:229:17
		at /usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/node_modules/async/lib/async.js:516:34
		at MochaGenerator.<anonymous> (/usr/local/lib/node_modules/generator-mocha/node_modules/yeoman-generator/lib/actions/install.js:38:7)
		at ChildProcess.EventEmitter.emit (events.js:117:20)

The solution to fix this is t oexecute the bower install command again:

	bower install
	
	
		
		
## Files created in wrong folder

Davys-MacBook-Air:Projects ddewaele$ vi .yo-rc.json

{
  "generator-backbone": {
    "appPath": "app",
    "coffee": false,
    "testFramework": "mocha",
    "templateFramework": "lodash",
    "compassBootstrap": true,
    "includeRequireJS": false
  }
}


## Grunt not starting

Davys-MacBook-Air:BackboneTest ddewaele$ grunt serve
grunt-cli: The grunt command line interface. (v0.1.8)

Fatal error: Unable to find local grunt.

If you're seeing this message, either a Gruntfile wasn't found or grunt
hasn't been installed locally to your project. For more information about
installing and configuring grunt, please see the Getting Started guide:

http://gruntjs.com/getting-started

## Error executing grunt serve

Davys-MacBook-Air:BackboneTest ddewaele$ grunt serve
Loading "Gruntfile.js" tasks...ERROR
>> Error: Cannot find module 'connect-livereload'
Warning: Task "serve" not found. Use --force to continue.

Aborted due to warnings.


Solution : just do an npm install



## bower_components folder not created

Make sure to execute the bower install command before running npm install


## Too many open files

	Davys-MacBook-Air:BackboneTest ddewaele$ sudo npm update -g bower
	Password:
	npm WARN package.json connect@2.7.4 No README.md file found!
	npm WARN package.json methods@0.0.1 No README.md file found!
	npm http GET https://registry.npmjs.org/bower
	Assertion failed: (handle_->Get(String::New("error"))->BooleanValue() == false), function ClearError, file ../src/node_crypto.cc, line 967.
	Davys-MacBook-Air:BackboneTest ddewaele$ sudo npm update -g bower
	npm WARN package.json connect@2.7.4 No README.md file found!
	npm WARN package.json methods@0.0.1 No README.md file found!
	npm ERR! Error: EMFILE, open '/usr/local/lib/node_modules/generator-backbone-mocha/node_modules/yeoman-generator/node_modules/isbinaryfile/package.json'
	npm ERR! If you need help, you may report this log at:
	npm ERR!     <http://github.com/isaacs/npm/issues>
	npm ERR! or email it to:
	npm ERR!     <npm-@googlegroups.com>
	
	npm ERR! System Darwin 11.4.2
	npm ERR! command "node" "/usr/local/bin/npm" "update" "-g" "bower"
	npm ERR! Error: EMFILE, too many open files
	npm ERR!     at errorHandler (/usr/local/lib/node_modules/npm/lib/utils/error-handler.js:247:28)
	npm ERR!     at /usr/local/lib/node_modules/npm/lib/update.js:27:20
	npm ERR!     at /usr/local/lib/node_modules/npm/lib/outdated.js:33:30
	npm ERR!     at cb (/usr/local/lib/node_modules/npm/node_modules/slide/lib/async-map.js:48:11)
	npm ERR!     at cb (/usr/local/lib/node_modules/npm/node_modules/slide/lib/async-map.js:48:11)
	npm ERR!     at /usr/local/lib/node_modules/npm/lib/outdated.js:100:22
	npm ERR!     at cb (/usr/local/lib/node_modules/npm/node_modules/slide/lib/async-map.js:48:11)
	npm ERR!     at /usr/local/lib/node_modules/npm/lib/outdated.js:96:73
	npm ERR!     at /usr/local/lib/node_modules/npm/node_modules/read-package-json/read-json.js:79:40
	npm ERR!     at parseJson (/usr/local/lib/node_modules/npm/node_modules/read-package-json/read-json.js:108:32)
	npm ERR! If you need help, you may report this log at:
	npm ERR!     <http://github.com/isaacs/npm/issues>
	npm ERR! or email it to:
	npm ERR!     <npm-@googlegroups.com>
	
	npm ERR! System Darwin 11.4.2
	npm ERR! command "node" "/usr/local/bin/npm" "update" "-g" "bower"
	
	/usr/local/lib/node_modules/npm/lib/utils/error-handler.js:247
	  log.error("cwd", process.cwd())
							   ^
	Error: EMFILE, too many open files
		at process.errorHandler (/usr/local/lib/node_modules/npm/lib/utils/error-handler.js:247:28)
		at process.EventEmitter.emit (events.js:117:20)
		at process._fatalException (node.js:272:26)


Googling found a lot of people struggling with this issue. The following commands were suggested but didn't work for me.

	launchctl limit maxfiles 2048 2048 
	sudo ulimit -n 10480

Executing the following worked for me:

	ulimit -n 1000
	

## CORS

If you configure your backend on a different location you'll need to deal with CORS.


You'll get the following errors :

	OPTIONS http://localhost:3000/blogs 
	Request header field X-Requested-With is not allowed by Access-Control-Allow-Headers.

and

	XMLHttpRequest cannot load http://localhost:3000/blogs. 
	Request header field X-Requested-With is not allowed by Access-Control-Allow-Headers. 




Request 

OPTIONS http://localhost:3000/blogs

Status Code:200 OK

Request headers:

	Accept:*/*
	Accept-Encoding:gzip,deflate,sdch
	Accept-Language:en-US,en;q=0.8,nl;q=0.6
	Access-Control-Request-Headers:accept, x-requested-with
	Access-Control-Request-Method:GET
	Connection:keep-alive
	Host:localhost:3000
	Origin:http://localhost:9000
	Referer:http://localhost:9000/
	User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36

Response headers : 

	Access-Control-Allow-Headers:Content-Type, Authorization
	Access-Control-Allow-Methods:GET,PUT,POST,DELETE
	Access-Control-Allow-Origin:*
	Connection:keep-alive
	Content-Length:2
	Content-Type:text/plain
	Date:Fri, 07 Feb 2014 13:01:15 GMT
	X-Powered-By:Express

	
## Backend JSON structure

Our backend returns a collection in the following way.

{
  "blogs": [
    {
      "title": "The title",
      "content": "the content",
      "_id": "52f4debba8854b7526000001"
    }
  ]
}

As you can see it has a single property called `blogs` that contains an array of blog elements.

data.models[0].get('blogs') would return an array of blog elemens

So if we pass on `{blogs:data.models[0].get('blogs')}` , we can do the following in Handlebars:

	<p>Blog list : </p>
	
	<table class="table">
	{{#each blogs}}
		<tr><td>{{title}}</td><td>{{content}}</td></tr>
	{{/each}}
	</table>

If we were to pass in the `{blogs:data.models[0]}`

An alternative is to return a true array


data.each(function (f) { console.log(f.get('title')) });


### Single object

	{
	  "blog": {
		"title": "The title",
		"content": "the content",
		"_id": "52f4debba8854b7526000001"
	  }
	}


# Circular dependencies

With the following code:

	require("BlogRouter").initialize().navigate('/#blogs', {
                        trigger : true
                    });

The following error occured:

	Uncaught Error: Module name "BlogRouter" has not been loaded yet for context: _. Use require([])


After changing the code above to this:

    require(['routes/blog'], function (router) {
        router.navigate('/#blogs', {
            trigger : true
        });
    });

It still got errors:

	Error: Backbone.history has already been started


## Backone IDs vs MongoDB ids


If you have a model that has specified it's own ID

    var BlogModel = Backbone.Model.extend({
    	urlRoot: '/blogs',
		idAttribute: '_id'
	});

When you create a new Backbone model like this:

    var blog = new BlogModel({
        id : blogDetails._id
    });

The object will **not** have an id, as you can see from the expressions below:


	blog.get('_id')		undefined
	blog.get('id')		"52f68b4b6ab6be5633000002"
	blog.id 			undefined

## LiveReload

Had a 1-time issues with Grunt when the reloading failed. Not sure what that was about

	LiveReload protocol error (invalid command 'reload', only valid commands are: hello)) after receiving data: "{"command":"reload","path":"app/scripts/routes/blog2.js","liveCss":true,"liveJs":true}".. 


## Grunt dependencies not found.

Error while executing grunt build with the following errors

	grunt build
	>> Local Npm module "grunt-bower-requirejs" not found. Is it installed?
	>> Local Npm module "grunt-requirejs" not found. Is it installed?
	Warning: Task "requirejs" not found. Use --force to continue.

	Aborted due to warnings.

We need to run the `npm install` command to install all the npm modules.


## Usemin 2.0 does not like RequireJS blocks

When bumping the usemin version from the default `0.1.10` to `2.1.0` the following error pops up when running `grunt serve:dist` :

	Running "useminPrepare:dist" (useminPrepare) task
	Going through app/index.html to update the config
	Looking for build script HTML comment blocks
	Fatal error: require.js blocks are no more supported.

Whenever it seems something like this in your html it will throw the error above

	<!-- build:js js/app.min.js -->
	<script data-main="js/main" src="js/vendor/require.js"></script>
	<!-- -->

## No compatible version found: chalk@'^0.4.0'

The version of npm (1.2.15) that I was using was incompatible with this carrot sign.
After upgrading npm to 1.4.6 I was able to use the new ^ operator.



# Questions

## Creating javascript modules



# References

- http://gruntjs.com/
- http://backbonejs.org/
- http://requirejs.org/
- http://handlebarsjs.com/

- http://backbonetutorials.com/organizing-backbone-using-modules/
- https://www.captechconsulting.com/blog/philip-kedy/modularizing-your-backbone-router-using-requirejs
- http://weblog.bocoup.com/organizing-your-backbone-js-application-with-modules/
- http://jonkemp.com/backbone/setting-up-a-backbone-js-webapp-with-yeoman-grunt-and-bower-part-2.html

- http://rockyj.in/2013/05/11/yeoman_and_backbone.html
- http://blog.revathskumar.com/2013/06/yeoman-backbone-generator.html
- https://github.com/yeoman/generator-backbone#readme	
- http://code.tutsplus.com/tutorials/building-apps-with-the-yeoman-workflow--net-33254

- http://www.9bitstudios.com/2013/05/using-templates-in-backbone-js/
- https://www.codeschool.com/courses/anatomy-of-backbonejs
- http://www.levihackwith.com/using-handlebars-each-blocks-with-backbone-collections-templates/
- http://javascriptplayground.com/blog/2012/07/requirejs-amd-tutorial-introduction/

- http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
- https://github.com/thomasdavis/backboneboilerplate

SO Post that helped me out.

- http://stackoverflow.com/questions/16308658/require-js-module-not-seeing-backbone-router-js/16314250#16314250

- http://lostechies.com/derickbailey/2011/06/17/making-mongoid-play-nice-with-backbone-js/