var generator = require('../../loom/generators/component');
var msg = require('loom/lib/message');
var sinon = require('sinon');

describe('component generator', function() {
  describe('before', function() {
    it('validates whether or not it is a component', function(done) {
      var mock = sinon.mock(msg);
      mock.expects('error').once().withArgs("Components must have a '-' character");
      var env = { args: ['user'] };
      generator.before(function() {
        mock.verify();
        mock.restore();
        done();
      }, env);
    });
  });

  describe('savePath', function() {
    var env = { args: ['x-foo'], rawName: 'x-foo', name: 'component', params: {}};

    it('saves the tests to the right place', function(done) {
      generator.templates(function(templates){
        generator.savePath(function(path) {
          path.should.equal('tests/unit/components/x-foo-tests.js');
          done();
        }, env, templates[2]);
      }, env);
    });

    it('saves the template to the right place', function(done) {
      generator.templates(function(templates){
        generator.savePath(function(path) {
          path.should.equal('app/templates/components/x-foo.hbs');
          done();
        }, env, templates[1]);
      }, env);
    });

    it('saves the component to the right place', function(done) {
      generator.templates(function(templates){
        generator.savePath(function(path) {
          path.should.equal('app/components/x-foo.js');
          done();
        }, env, templates[0]);
      }, env);
    });
  });
});
