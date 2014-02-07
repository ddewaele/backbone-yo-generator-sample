/*global define*/

define([
    'jquery',
    'backbone',
    'views/blog',
], function ($, Backbone,BlogView) {
    'use strict';

    var BlogRouter = Backbone.Router.extend({
        routes: {
        	 "blogs" : "viewBlogs"
        }
    });

    var initialize = function(){
    	console.log("inside initialize BlogRouter");
    	
    	var router = new BlogRouter;
    
	    router.on('route:viewBlogs', function(){
	    	console.log('route viewBlogs triggered');
	    	var blogView = new BlogView();
	    	blogView.render();
	      // var projectListView = new ProjectListView();
	      // projectListView.render();
	    });

	    console.log('history start');
	    Backbone.history.start();
	};

  	return {
    	initialize: initialize
  	};

    //return BlogRouter;
});
