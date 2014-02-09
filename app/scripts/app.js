// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'routes/blog',
  'handlebars' 
], function($, _, Backbone, BlogRouter,Handlebars){

    var initialize = function(){
      //BlogRouter.initialize();

      console.log("Found router = " + BlogRouter);

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

      $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
      };

      // Backbone.Model.prototype.toJSON = function() {
      //   var json = _.clone(this.attributes);
      //   delete json._id;
      //   return json;
      // };      

      


  }

  return {
    initialize: initialize
  };
});