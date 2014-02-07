/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var BlogModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return BlogModel;
});
