describe('When setting the root selector before starting Intercept', function() {
  beforeEach(function() {
    Backbone.Intercept.rootSelector = '.backbone-root';

    // Create a normal link; one that shouldn't be intercepted
    this.$normalLink = $('<a href="http://www.google.com"></a>');
    this.setFixtures(this.$normalLink);

    // Create the scope of our app
    this.$scope = $('<div class="backbone-root"></div>');
    this.setFixtures(this.$scope);

    // Lastly, insert a link into the scope
    this.$scopedLink = $('<a href="http://www.google.com"></a>');
    this.$scope.append(this.$scopedLink);

    // Start intercept and click around
    Backbone.Intercept.start();

    this.leftClick = $.Event('click');
    this.leftClick.which = 1;
    this.leftClick.preventDefault();
  });

  describe('and clicking a link outside of the scoped element', function() {
    beforeEach(function() {
      this.$normalLink.trigger(this.leftClick);
    });

    it('should not prevent the default behavior of that link', function() {
      expect(this.leftClick.preventDefault).to.not.have.beenCalled;
    });
  });

  describe('and clicking a link within the scoped element', function() {
    beforeEach(function() {
      this.$scopedLink.trigger(this.leftClick);
    });

    it('should prevent the default behavior of that link', function() {
      expect(this.leftClick.preventDefault).to.have.beenCalledOnce;
    });
  });

});
