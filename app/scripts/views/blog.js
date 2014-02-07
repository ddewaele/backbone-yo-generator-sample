/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/blog'
], function ($, _, Backbone, JST,BlogCollection) {
    'use strict';

    var BlogListView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog.hbs'],

		el: $('.page'),

        render: function(){

		var blogs = new BlogCollection();

		var that = this;
	    blogs.fetch({
	
	      success: function (data) {
	        console.log("Found blogs = " + data);
        	that.$el.html(that.template({ blogs: data.toJSON() }))
          	return this;  

	      },
	
	      error: function(model, xhr, options) {
	        console.log("Error occured while retreiving blogs. (Status = " + xhr.status+ ")");
        	that.$el.html(that.template({ title: "error" }))
          	return this;  

	      }
	    });

        }

    });



    return BlogListView;
});
