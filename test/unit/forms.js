describe('When submitting a form', function() {
  beforeEach(function() {
    Backbone.Intercept.start();
    this.submitEvent = $.Event('submit');
    this.submitEvent.preventDefault();
    this.sinon.spy(this.submitEvent, 'preventDefault');
  });

  describe('and the form does not have an action attribute', function() {
    beforeEach(function() {
      var $form = $('<form></form>');
      this.setFixtures($form);
      $form.trigger(this.submitEvent);
    });

    it('should prevent the default action', function() {
      expect(this.submitEvent.preventDefault).to.have.been.calledOnce;
    });
  });

  describe('and the form has a defined action attribute', function() {
    beforeEach(function() {
      var $form = $('<form action="post"></form>');
      this.setFixtures($form);
      $form.trigger(this.submitEvent);
    });

    it('should not prevent the default action', function() {
      expect(this.submitEvent.preventDefault).to.not.have.been.calledOnce;
    });
  });
});
