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
        	 "blogs/edit/:blogId" : "viewBlog",
        	 "blogs/new" : "createBlog"
        }
    });

    var blogListView = new BlogListView();
	var blogEditView = new BlogEditView();
	
    var initialize = function(){

    	var router = new BlogRouter;
    
	    router.on('route:viewBlogs', function(){
	    	blogListView.render();
	    });

	    router.on('route:viewBlog', function(blogId){
	    	blogEditView.render({blogId:blogId});
	    });

	    router.on('route:createBlog', function(blogId){
	    	blogEditView.render();
	    });	    


	    console.log("initializing the backbone history");

	    Backbone.history.start();

	    return router;
	};

	return initialize();


  	// return {
   //  	initialize: initialize
  	// };
});
