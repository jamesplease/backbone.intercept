describe('When calling start', function() {
  beforeEach(function() {
    this.sinon.stub(_, 'bind', _.identity);
  });

  describe('and passing no options', function() {
    beforeEach(function() {
      this.$body = Backbone.Intercept._getRootElement();
      this.sinon.stub(this.$body, 'on');
      Backbone.Intercept.start();
    });

    it('should set handlers for click and submit events', function() {
      expect(_.bind)
        .to.have.been.calledTwice
        .and.calledWithExactly(Backbone.Intercept._interceptLinks, Backbone.Intercept)
        .and.calledWithExactly(Backbone.Intercept._interceptForms, Backbone.Intercept);
      expect(this.$body.on)
        .to.have.been.calledTwice
        .and.calledWithExactly('click.backboneIntercept', 'a', Backbone.Intercept._interceptLinks)
        .and.calledWithExactly('submit.backboneIntercept', Backbone.Intercept._interceptForms);
    });
  });

  describe('and specifying false for links', function() {
    beforeEach(function() {
      this.$body = Backbone.Intercept._getRootElement();
      this.sinon.stub(this.$body, 'on');
      Backbone.Intercept.start({links: false});
    });

    it('should only set handlers for link events', function() {
      expect(_.bind)
        .to.have.been.calledOnce
        .and.calledWithExactly(Backbone.Intercept._interceptForms, Backbone.Intercept);
      expect(this.$body.on)
        .to.have.been.calledOnce
        .and.calledWithExactly('submit.backboneIntercept', Backbone.Intercept._interceptForms);
    });
  });

  describe('and specifying false for forms', function() {
    beforeEach(function() {
      this.$body = Backbone.Intercept._getRootElement();
      this.sinon.stub(this.$body, 'on');
      Backbone.Intercept.start({forms: false});
    });

    it('should only set handlers for link events', function() {
      expect(_.bind)
        .to.have.been.calledOnce
        .and.calledWithExactly(Backbone.Intercept._interceptLinks, Backbone.Intercept);
      expect(this.$body.on)
        .to.have.been.calledOnce
        .and.calledWithExactly('click.backboneIntercept', 'a', Backbone.Intercept._interceptLinks);
    });
  });

  describe('and specifying false for links and forms', function() {
    beforeEach(function() {
      this.$body = Backbone.Intercept._getRootElement();
      this.sinon.stub(this.$body, 'on');
      Backbone.Intercept.start({forms: false, links: false});
    });

    it('should not set any handlers', function() {
      expect(this.$body.on).to.not.have.beenCalled;
    });
  });
});
