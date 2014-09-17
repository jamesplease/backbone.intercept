describe('When calling the navigate method', function() {
  beforeEach(function() {
    this.sinon.stub(Backbone.history, 'navigate');
    Backbone.Intercept.navigate('path/to/my-resource', {trigger:true});
  });

  it('should pass the URI along to the history navigate method', function() {
    expect(Backbone.history.navigate)
      .to.have.been.calledOnce
      .and.calledWithExactly('path/to/my-resource', {trigger:true});
  });
});
