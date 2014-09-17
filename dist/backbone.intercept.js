// Backbone.Intercept v0.1.0
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
  
    VERSION: '0.1.0',
  
    trigger: true,
  
    navigateWith: Backbone.history,
  
    start: function(options) {
      options = options || {};
      options = _.defaults(options, this._defaults);
  
      if (options.links) {
        Backbone.Intercept._getBody().on('click', 'a', Backbone.Intercept._interceptLinks);
      }
      if (options.forms) {
        Backbone.Intercept._getBody().on('submit', Backbone.Intercept._interceptForms);
      }
    },
  
    stop: function() {
      Backbone.Intercept._getBody().off('click', 'a', Backbone.Intercept._interceptLinks);
      Backbone.Intercept._getBody().off('submit', Backbone.Intercept._interceptForms);
    },
  
    // By default we intercept both links and forms
    _defaults: {
      links: true,
      forms: true
    },
  
    // Creates and caches a jQuery object for the body element
    _getBody: function() {
      if (this._body) { return this._body; }
      this._body = $('body');
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
      var $link = $(e.currentTarget);
  
      // Get the href; stop processing if there isn't one
      var href = $link.attr('href');
      if (!href) { return; }
  
      // Determine if we're supposed to bypass the link
      // based on its attributes
      var bypass;
      var bypassAttr = $link.attr('bypass');
      var dataBypassAttr = $link.attr('data-bypass');
      if (bypassAttr !== undefined) {
        bypass = bypassAttr;
      } else if (dataBypassAttr !== undefined) {
        bypass = dataBypassAttr;
      }
      if (bypass !== undefined && bypass !== 'false') { return; }
  
      // The options we pass along to navigate
      var navOptions = {
        trigger: Backbone.Intercept.trigger
      };
  
      // Determine if it's trigger: false based on the attributes
      var trigger;
      var triggerAttr = $link.attr('trigger');
      var dataTriggerAttr = $link.attr('data-trigger');
      if (triggerAttr !== undefined) {
        trigger = triggerAttr;
      } else if (dataTriggerAttr !== undefined) {
        trigger = dataTriggerAttr;
      }
      if (trigger !== undefined && trigger === 'false') {
        navOptions.trigger = false;
      } else if (trigger !== undefined && trigger === 'true') {
        navOptions.trigger = true;
      }
  
      // Return if the URL is absolute, or if the protocol is mailto or javascript
      if (/^#|javascript:|mailto:|(?:\w+:)?\/\//.test(href)) { return; }
  
      // If we haven't been stopped yet, then we prevent the default action
      e.preventDefault();
  
      // Lastly we send off the information to the router
      if (!Backbone.Intercept.navigate) { return; }
      Backbone.Intercept.navigate(href, navOptions);
    },
  
    navigate: function(uri, options) {
      Backbone.history.navigate(uri, options);
    }
  };
  

  return Backbone.Intercept;
}));
