/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var BlogView = Backbone.View.extend({
        template: JST['app/scripts/templates/blog.hbs'],

		el: $('.page'),

        render: function(){
        	this.$el.html(this.template({ title: "this is the title" }))
          	return this;  
        }

    });

    return BlogView;
});
