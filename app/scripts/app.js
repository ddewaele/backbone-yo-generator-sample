// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'routes/blog',
  'routes/product',
  'handlebars' 
], function($, _, Backbone, BlogRouter,ProductRouter,Handlebars){
  var initialize = function(){
    BlogRouter.initialize();


    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'http://localhost:3000' + options.url;  
    });

    Handlebars.registerHelper('list', function(items, options) {
      var out = "<ul>";

      for(var i=0, l=items.length; i<l; i++) {
        out = out + "<li>" + options.fn(items[i]) + "</li>";
      }

      return out + "</ul>";
    });


    Handlebars.JavaScriptCompiler.prototype.nameLookup = function(parent, name, type) {
      var result = '(' + parent + ' instanceof Backbone.Model ? ' + parent + '.get("' + name + '") : ' + parent;
      if (/^[0-9]+$/.test(name)) {
        return result + "[" + name + "])";
      } else if (Handlebars.JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        return result + "." + name + ')';
      } else {
        return result + "['" + name + "'])";
      }
    };


  }

  return {
    initialize: initialize
  };
});