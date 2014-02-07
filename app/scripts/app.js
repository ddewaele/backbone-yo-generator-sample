// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'routes/blog', // Request router.js
], function($, _, Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    console.log("Initializing router");
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});