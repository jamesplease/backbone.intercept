describe('When calling stop', function() {
  beforeEach(function() {
    this.$body = Backbone.Intercept._getRootElement();
    this.sinon.stub(this.$body, 'off');
    Backbone.Intercept.stop();
  });

  it('should remove all listeners', function() {
    expect(this.$body.off)
      .to.have.been.calledOnce
      .and.calledWithExactly('.backboneIntercept');
  });
});
