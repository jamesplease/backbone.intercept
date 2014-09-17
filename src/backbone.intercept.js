Backbone.Intercept = {

  VERSION: '<%= version %>',

  defaults: {
    trigger : true,
    links   : true,
    forms   : true
  },

  start: function(options) {
    options = options || {};
    options = _.defaults(options, this.defaults);

    if (options.links) {
      this._getBody().on('click.backboneIntercept', 'a', _.bind(this._interceptLinks, this));
    }
    if (options.forms) {
      this._getBody().on('submit.backboneIntercept', _.bind(this._interceptForms, this));
    }
  },

  stop: function() {
    this._getBody().off('.backboneIntercept');
  },

  navigate: function(uri, options) {
    Backbone.history.navigate(uri, options);
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
      trigger: this.defaults.trigger
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
    if (!this.navigate) { return; }
    this.navigate(href, navOptions);
  }
};
