/*global define*/

define([
    'jquery',
    'backbone',
    'views/blog',
    'views/blog-edit'
], function ($, Backbone,BlogListView,BlogEditView) {
    'use strict';

    var BlogRouter = Backbone.Router.extend({
        routes: {
        	 "blogs" : "viewBlogs",
        	 "blogs/edit/:blogId" : "viewBlog"

        }
    });

    var initialize = function(){

    	var router = new BlogRouter;
    
	    router.on('route:viewBlogs', function(){
	    	var blogListView = new BlogListView();
	    	blogListView.render();
	    });

	    router.on('route:viewBlog', function(blogId){
	    	var blogEditView = new BlogEditView();
	    	blogEditView.render({blogId:blogId});
	    });

	    Backbone.history.start();
	};

  	return {
    	initialize: initialize
  	};
});
