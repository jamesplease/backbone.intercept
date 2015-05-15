// Backbone.Intercept v0.3.3
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return factory(Backbone, _);
    });
  }
  else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(Backbone, _);
  }
  else {
    factory(root.Backbone, root._);
  }
}(this, function(Backbone, _) {
  'use strict';

  Backbone.Intercept = {
  
    VERSION: '0.3.3',
  
    rootSelector: 'body',
  
    defaults: {
      trigger : true,
      links   : true,
      forms   : true
    },
  
    start: function(options) {
      options = _.defaults(options || {}, this.defaults);
  
      if (options.links) {
        this._getRootElement().on('click.backboneIntercept', 'a', _.bind(this._interceptLinks, this));
      }
      if (options.forms) {
        this._getRootElement().on('submit.backboneIntercept', _.bind(this._interceptForms, this));
      }
    },
  
    stop: function() {
      this._getRootElement().off('.backboneIntercept');
    },
  
    navigate: function(uri, options) {
      Backbone.history.navigate(uri, options);
    },
  
    // Creates and caches a jQuery object for the body element
    _getRootElement: function() {
      if (this._body) { return this._body; }
      this._body = Backbone.$(this.rootSelector);
      return this._body;
    },
  
    // Prevent the default behavior of submitting the
    // form if the action attribute is present and is
    // a value
    _interceptForms: function(e) {
      if (e.target && e.target.action) { return; }
      e.preventDefault();
    },
  
    _interceptLinks: function(e) {
      // Only intercept left-clicks
      if (e.which !== 1) { return; }
      var $link = Backbone.$(e.currentTarget);
  
      // Get the href; stop processing if there isn't one
      var href = $link.attr('href');
      if (!href) { return; }
  
      // Determine if we're supposed to bypass the link
      // based on its attributes
      var bypass = this._getAttr($link, 'bypass');
      if (bypass !== undefined && bypass !== 'false') {
        return;
      }
  
      // The options we pass along to navigate
      var navOptions = {
        trigger: this.defaults.trigger
      };
  
      // Determine if it's trigger: false based on the attributes
      var trigger = this._getAttr($link, 'trigger');
  
      if (trigger === 'false') {
        navOptions.trigger = false;
      } else if (trigger === 'true') {
        navOptions.trigger = true;
      }
  
      // Return if the URL is absolute, or if the protocol is mailto or javascript
      if (/^#|javascript:|mailto:|(?:\w+:)?\/\//.test(href)) { return; }
  
      // If we haven't been stopped yet, then we prevent the default action
      e.preventDefault();
  
      // Get the computed pathname of the link, removing
      // the leading slash. Regex required for IE8 support
      var pathname = $link[0].pathname.replace(/^\//, '') + $link[0].search;
  
      // Lastly we send off the information to the router
      if (!this.navigate) { return; }
      this.navigate(pathname, navOptions);
    },
  
    _getAttr: function($el, name) {
      var attr = $el.attr(name);
      if (attr !== undefined) {
        return attr;
      }
      var data = $el.attr('data-' + name);
      if (data !== undefined) {
        return data;
      }
    }
  };
  

  return Backbone.Intercept;
}));
