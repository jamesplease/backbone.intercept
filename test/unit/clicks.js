describe('When clicking a link', function() {
  beforeEach(function() {
    Backbone.Intercept.start();
  });

  describe('with a left click', function() {
    beforeEach(function() {
      this.leftClick = $.Event('click');
      this.leftClick.which = 1;
      this.leftClick.preventDefault();
      this.sinon.stub(this.leftClick, 'preventDefault');
    });

    describe('and the link is relative, without a leading slash', function() {
      beforeEach(function() {
        var $link = $('<a href="path/to/my-thing"></a>');
        this.setFixtures($link);
        this.sinon.stub(Backbone.Intercept, 'navigate');
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });

      it('should pass trigger:true to the share method', function() {
        expect(Backbone.Intercept.navigate)
          .to.have.been.calledOnce
          .and.calledWithExactly('test/path/to/my-thing', {trigger:true});
      });
    });

    describe('and the link is relative, with a leading slash', function() {
      beforeEach(function() {
        var $link = $('<a href="/path/to/my-thing"></a>');
        this.setFixtures($link);
        this.sinon.stub(Backbone.Intercept, 'navigate');
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });

      it('should pass trigger:true to the share method', function() {
        expect(Backbone.Intercept.navigate)
          .to.have.been.calledOnce
          .and.calledWithExactly('path/to/my-thing', {trigger:true});
      });
    });

    describe('and the link starts with www', function() {
      beforeEach(function() {
        var $link = $('<a href="www.my-site.com"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });
    });

    describe('and the link is a fragment (it starts with #)', function() {
      beforeEach(function() {
        var $link = $('<a href="#fragment"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the link is absolute, starting with http://', function() {
      beforeEach(function() {
        var $link = $('<a href="http://www.my-site.com"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the link is absolute, starting with https://', function() {
      beforeEach(function() {
        var $link = $('<a href="https://www.my-site.com"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the link is using the javascript: protocol', function() {
      beforeEach(function() {
        var $link = $('<a href="javascript:void"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the link is using the mailto: protocol', function() {
      beforeEach(function() {
        var $link = $('<a href="mailto:aaa@bbb.ccc"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the link has no href attribute', function() {
      beforeEach(function() {
        var $link = $('<a></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the "data-bypass" attribute exists on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-doc.pdf" data-bypass></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the "data-bypass" attribute is "true" on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-doc.pdf" data-bypass="true"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the "data-bypass" attribute is "false" on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-doc.pdf" data-bypass="false"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });
    });

    describe('and the "bypass" attribute exists on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-doc.pdf" bypass></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the "bypass" attribute is "true" on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-doc.pdf" bypass="true"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should not intercept the link', function() {
        expect(this.leftClick.preventDefault).to.not.have.been.calledOnce;
      });
    });

    describe('and the "bypass" attribute is "false" on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-doc.pdf" bypass="false"></a>');
        this.setFixtures($link);
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });
    });

    describe('and the "trigger" attribute is undefined on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-page" trigger></a>');
        this.setFixtures($link);
        this.sinon.stub(Backbone.Intercept, 'navigate');
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });

      it('should pass trigger:true to the share method', function() {
        expect(Backbone.Intercept.navigate)
          .to.have.been.calledOnce
          .and.calledWithExactly('test/link/to/my-page', {trigger:true});
      });
    });

    describe('and the "trigger" attribute is false on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-page" trigger="false"></a>');
        this.setFixtures($link);
        this.sinon.stub(Backbone.Intercept, 'navigate');
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });

      it('should pass trigger:false to the share method', function() {
        expect(Backbone.Intercept.navigate)
          .to.have.been.calledOnce
          .and.calledWithExactly('test/link/to/my-page', {trigger:false});
      });
    });

    describe('and the "data-trigger" attribute is false on the link', function() {
      beforeEach(function() {
        var $link = $('<a href="link/to/my-page" data-trigger="false"></a>');
        this.setFixtures($link);
        this.sinon.stub(Backbone.Intercept, 'navigate');
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });

      it('should pass trigger:false to the share method', function() {
        expect(Backbone.Intercept.navigate)
          .to.have.been.calledOnce
          .and.calledWithExactly('test/link/to/my-page', {trigger:false});
      });
    });
    
    describe('the link has search parameters', function() {
      beforeEach(function() {
        var $link = $('<a href="path/to/my-thing?page=1&limit=50"></a>');
        this.setFixtures($link);
        this.sinon.stub(Backbone.Intercept, 'navigate');
        $link.trigger(this.leftClick);
      });

      it('should intercept the link', function() {
        expect(this.leftClick.preventDefault).to.have.been.calledOnce;
      });

      it('should have the search parameters inside the link navigated to', function() {
        expect(Backbone.Intercept.navigate)
          .to.have.been.calledOnce
          .and.calledWithExactly('test/path/to/my-thing?page=1&limit=50', {trigger:true});
      });
    });
  });

  describe('with a middle click', function() {
    beforeEach(function() {
      this.middleClick = $.Event('click');
      this.middleClick.which = 2;
      this.middleClick.preventDefault();
      this.sinon.stub(this.middleClick, 'preventDefault');
    });

    describe('and the link is relative, without a leading slash', function() {
      beforeEach(function() {
        var $link = $('<a href="path/to/my-thing"></a>');
        this.setFixtures($link);
        $link.trigger(this.middleClick);
      });

      it('should not intercept the link', function() {
        expect(this.middleClick.preventDefault).to.not.have.been.calledOnce;
      });
    });
  });

  describe('with a right click', function() {
    beforeEach(function() {
      this.rightClick = $.Event('click');
      this.rightClick.which = 3;
      this.rightClick.preventDefault();
      this.sinon.stub(this.rightClick, 'preventDefault');
    });

    describe('and the link is relative, without a leading slash', function() {
      beforeEach(function() {
        var $link = $('<a href="path/to/my-thing"></a>');
        this.setFixtures($link);
        $link.trigger(this.rightClick);
      });

      it('should not intercept the link', function() {
        expect(this.rightClick.preventDefault).to.not.have.been.calledOnce;
      });
    });
  });
});
