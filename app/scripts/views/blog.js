/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/blog',
    'models/blog'
], function ($, _, Backbone, JST,BlogCollection,BlogModel) {
    'use strict';

    var BlogListView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog.hbs'],

		el: $('.page'),

		events : {
            'click .deleteBlog': 'deleteBlog'
        },


        deleteBlog : function(ev) {
            console.log("Calling deleteBlog");
            ev.preventDefault();
            
            var id = $(ev.currentTarget).data('blog-id');
            
            var blog = new BlogModel({
                _id : id
            });

            blog.destroy({
                success : function() {
                    require(['routes/blog'], function (router) {
                        router.navigate('/#blogs', {
                            trigger : true
                        });
                    });
                }
            })
        },

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
