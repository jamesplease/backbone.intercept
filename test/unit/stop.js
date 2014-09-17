describe('When calling stop', function() {
  beforeEach(function() {
    this.$body = Backbone.Intercept._getBody();
    this.sinon.stub(this.$body, 'off');
    Backbone.Intercept.stop();
  });

  it('should remove all listeners', function() {
    expect(this.$body.off)
      .to.have.been.calledTwice
      .and.calledWithExactly('click', 'a', Backbone.Intercept._interceptLinks)
      .and.calledWithExactly('submit', Backbone.Intercept._interceptForms);
  });
});
