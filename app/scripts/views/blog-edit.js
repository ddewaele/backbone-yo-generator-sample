/*global define*/

// Filename: blog-edit.js
define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'routes/blog',
  'models/blog'
  
], function($, _, Backbone, JST,BlogRouter,BlogModel){
    'use strict';


    console.log("LOG1 : Referencing the BlogRouter fine = " + BlogRouter);

    var BlogEditView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog-edit.hbs'],

        events : {
            'submit .save-blog-form' : 'saveBlog',
            'submit .update-blog-form' : 'updateBlog',
        },

		el: $('.page'),


        saveBlog : function(ev) {
            var blogDetails = $(ev.currentTarget).serializeObject();

            var blog = new BlogModel({
                id : null
            });

            blog.save(blogDetails, {
                success : function(user) {
                    require(['routes/blog'], function (router) {
                        router.navigate('/#blogs', {
                            trigger : true
                        });
                    });
                },
                error : function(model, response, options) {
                }
            });

            return false;
        },

        updateBlog : function(ev) {
            ev.preventDefault();
            
            var blogDetails = $(ev.currentTarget).serializeObject();


            var blog = new BlogModel({
                _id : blogDetails._id
            });

            delete blogDetails._id;

            console.log("Saving blog with payload : " + JSON.stringify(blogDetails));
            
            // Backbone will do a PUT if !isNew() , meaning that model.id != null  
            // the way you set the id field depends on how the ID Attribute is configured on the model.

            blog.save(blogDetails, {
                success : function(user) {

                    // This won't work due to circular dependencies.
                    // BlogRouter.navigate('/#blogs', {
                    //         trigger : true
                    // });

                    // This will.
                    require(['routes/blog'], function (router) {
                        router.navigate('/#blogs', {
                            trigger : true
                        });
                    });

                    
                },
                error : function(model, response, options) {
                }
            });

            return false;
        },

        render: function(options){

            if (options && options.blogId) {
                var blog = new BlogModel({_id:options.blogId});

                var that = this;
                
                blog.fetch({
                    success: function (data) {
                        console.log("Found blog with payload " + JSON.stringify(data.toJSON()));
                        that.$el.html(that.template({ blog: data.toJSON() }))
                        return this;  
                    },
            
                    error: function(model, xhr, options) {
                       console.log("Error occured while retreiving blogs. (Status = " + xhr.status+ ")");
                       that.$el.html(that.template({ blogId: "unkown" }))
                        return this;  
                    }
                });

            } else {
                this.$el.html(this.template({}))
            }

	       	
        }
    });

    return BlogEditView;
});
