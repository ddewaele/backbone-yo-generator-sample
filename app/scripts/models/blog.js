/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var BlogModel = Backbone.Model.extend({
    	urlRoot: '/blogs',
        defaults: {
        }
    });

    return BlogModel;
});
