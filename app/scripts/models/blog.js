/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var BlogModel = Backbone.Model.extend({
    	urlRoot: '/blogs',
		idAttribute: '_id',
        defaults: {
        }
    });

    return BlogModel;
});
