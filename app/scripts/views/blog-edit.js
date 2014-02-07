/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/blog',
    'routes/blog'
], function ($, _, Backbone, JST,BlogModel,BlogRouter) {
    'use strict';

    var BlogEditView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-edit.hbs'],

        events : {
            'submit .save-blog-form' : 'saveBlog',
            'submit .update-blog-form' : 'updateBlog'
        },

		el: $('.page'),


        saveBlog : function(ev) {
            var blogDetails = $(ev.currentTarget).serializeObject();

            var blog = new BlogModel({
                id : null
            });

            blog.save(blogDetails, {
                success : function(user) {
                    BlogRouter.navigate('/#blogs', {
                        trigger : true
                    });
                },
                error : function(model, response, options) {
                }
            });

            return false;
        },

        updateBlog : function(ev) {
            console.log("Calling updateBlog");
            ev.preventDefault();
            
            var blogDetails = $(ev.currentTarget).serializeObject();

            var blog = new BlogModel({
                id : blogDetails.id
            });

            blog.save(blogDetails, {
                success : function(user) {
                    BlogRouter.navigate('/#blogs', {
                        trigger : true
                    });
                },
                error : function(model, response, options) {
                }
            });

            return false;
        },
        deleteBlog : function(ev) {
            console.log("Calling deleteBlog");
            ev.preventDefault();
            
            var id = $(ev.currentTarget).data('blog-id');
            
            var blog = new BlogModel({
                id : id
            });

            blog.destroy({
                success : function() {
                    router.navigate('/#blogs', {
                        trigger : true
                    });
                }
            })
        },

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
