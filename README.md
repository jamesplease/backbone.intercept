# Backbone.Intercept

[![Travis Build Status](http://img.shields.io/travis/jmeas/backbone.intercept.svg?style=flat)](https://travis-ci.org/jmeas/backbone.intercept)

Backbone.Intercept intelligently manages link clicks and form submissions across Backbone applications.

### About

The default action of form submissions and link clicks is often undesirable in Backbone applications. One
would usually rather prevent that default behavior, then handle those through Backbone.history and possibly also
in a Router's callback. Backbone doesn't do any of this for you, but Backbone.Intercept does.

If you're writing `e.preventDefault()` in many of your view's event callbacks – or otherwise handling this problem on a per-view
basis – then Backbone.Intercept might be what you're looking for.

```js
// before Backbone.Intercept
var MyView = Backbone.View.extend({
  events: {
    'click a': 'onClick',
    'submit form': 'onSubmit'
  },

  onClick: function(e) {
    e.preventDefault();
    myRouter.navigate($(e.currentTarget).attr('href'));
  },

  onSubmit: function(e) {
    e.preventDefault();
    // form submit logic
  }
});

// after Backbone.Intercept
var MyView = Backbone.View.extend({
  events: {
    'submit form': 'onSubmit'
  },

  onSubmit: function(e) {
    // form submit logic
  }
});
```

## Installation

Install through `bower` or `npm`.

```js
bower install backbone.intercept
npm install backbone.intercept
```

#### Dependencies

Backbone.Intercept depends on Underscore, Backbone and a jQuery-like API on the `Backbone.$` object.

## Getting Started

Getting started is easy. Simply call `Backbone.Intercept.start()` when your application is started up. If
you're using Marionette, this might look something like

```js
app.on('start', Backbone.Intercept.start);
```

### Links

#### Default Behavior

In general, links with relative URIs will be intercepted, whereas absolute URIs will be ignored by Backbone.Intercept.
A few examples will best illustrate the default behavior of Intercept.

```js
// The following URIs will be intercepted
'path/to/my-page';
'/absolute/path/to/my-page';
'www.my-website.com';

// The following URIs will be ignored by Backbone.Intercept and handled like normal
'http://www.my-site.com';
'#my-page-fragment';
'mailto:stacy@email.com';
'javascript:void';
```

#### Navigation

By default your intercepted links will be sent along to `Backbone.history.navigate` to be processed. You can customize this
by overriding the `navigate` method on Backbone.Intercept. By doing this you could make Intercept work with a Router instead,
or integrate other libraries like [Backbone.Radio](https://github.com/marionettejs/backbone.radio).

```js
// Create a Router
var myRouter = new Backbone.Router();

// Attach it to Intercept
Backbone.Intercept.navigate = function(uri, options) {
  myRouter.navigate(uri, options);
};

// Or use a Backbone.Radio Channel
Backbone.Intercept.navigate = function(uri, options) {
  var routerChannel = Backbone.Radio.channel('router');
  routerChannel.command('navigate', uri, options);
};
```

If you don't want anything to happen when you click links you can specify the `navigate` function as a falsey value,
or an empty function.

```js
// This won't cause any navigation to occur when links are clicked
Backbone.Intercept.navigate = undefined;
```

#### Customizing the Behavior Per-Link

This behavior can be changed by setting custom attributes on the element.

```html
<!-- Force this link to be ignored by Backbone.Intercept -->
<a href='path/to/my-document.pdf' bypass></a>

<!-- If you want to follow the HTML5 spec, then this version works, too -->
<a href='path/to/my-document.pdf' data-bypass></a>

<!-- You can also be explicit, though this isn't necessary -->
<a href='path/to/my-document.pdf' bypass='true'></a>

<!-- If you've specified a navigateWith property, you can specify the trigger as an attribute -->
<a href='path/to/my-document.pdf' trigger='false'></a>

<!-- There's an HTML5-compliant version for that as well -->
<a href='path/to/my-document.pdf' data-trigger='false'></a>
```

#### Setting Global Link Trigger Behavior

You can set the default trigger behavior by specifying it directly on the Backbone.Intercept `defaults` option.

```js
// Let's set the trigger setting to false by default
Backbone.Intercept.defaults.trigger = false;
```

### Forms

Forms are much simpler than links. All forms are intercepted unless the `action` attribute has been specified. And unlike links, there's
no integration of forms with a Router.

```html
<!-- This form will be intercepted -->
<form></form>

<!-- But this one will not -->
<form action='post'></form>
```

### When Not To Use Backbone.Intercept

Backbone.Intercept works best in an application that is wholly Backbone. However, not every application
has this property. Often times people will inject Backbone components into a page that contains other,
non-Backbone code.

In those situations it is probably more desirable to manage link-clicks on a per-view basis.

## API

### Properties

##### `VERSION`

The version of Backbone.Intercept.

##### `defaults`

An object for the default values for the router. There are three properties in defaults, `links`, `forms`, and `trigger`,
and all three are `true` out-of-the-box. The first two options determine if Intercept handles links and forms, respectively. The
`trigger` option determines if intercepted links pass `trigger:true` by default.

The value of the `trigger` or `data-trigger` attribute on the anchor tag itself will always trump the value of the
value of `trigger` in the `defaults` hash.

### Methods

##### `start( [options] )`

Starts Backbone.Intercept. You can pass `options` as an argument to override the `defaults` property.

```js
// In this app we will only intercept forms
Backbone.Intercept.start({
  links: false
});

// And in this one only links
Backbone.Intercept.start({
  forms: false
});
```

##### `stop()`

Stop intercepting links and forms.

##### `navigate( uri, options )`  
default: `Backbone.history.navigate`

A method that's called when links are intercepted. By default it just forwards it along to `Backbone.history.navigate`, but you
can specify a custom method to do whatever you'd like.

The uri is the value of the link's `href` attribute. `options` are the navigation options, which is just an object
with a `trigger` property.
