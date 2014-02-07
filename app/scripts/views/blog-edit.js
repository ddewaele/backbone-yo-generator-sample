/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/blog'
], function ($, _, Backbone, JST,BlogModel) {
    'use strict';

    var BlogEditView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-edit.hbs'],

		el: $('.page'),

        render: function(options){

    		var blog = new BlogModel({id:options.blogId});
	       	
            var that = this;
            
            blog.fetch({
                success: function (data) {
                    that.$el.html(that.template({ blog: data.toJSON() }))
                    return this;  
                },
    	
                error: function(model, xhr, options) {
    	           console.log("Error occured while retreiving blogs. (Status = " + xhr.status+ ")");
            	   that.$el.html(that.template({ blogId: "unkown" }))
                    return this;  
                }
            });
        }
    });

    return BlogEditView;
});
