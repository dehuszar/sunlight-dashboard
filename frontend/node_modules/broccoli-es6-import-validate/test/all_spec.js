'use strict';

var path = require('path'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    sinon = require('sinon'),
    should = require('should'),
    Promise = require('rsvp').Promise,
    ES6ValidateFilter = require('../');

describe('ES6ValidateFilter', function () {
    var sandbox,
        tmpPath = path.join(__dirname, 'fixtures', 'temp');

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        rimraf.sync(tmpPath);

        fs.mkdirSync(tmpPath);
    });

    afterEach(function () {
        sandbox.restore();

        rimraf.sync(tmpPath);
    });

    // Until we have a proper test harness
    function readTree(s) {
        // Supports only plain-string trees
        return Promise.resolve(s);
    }

    it('validates import statements with a whitelist', function (done) {
        var tree = 'test/fixtures/regular';

        var warnStub = sandbox.stub(console, 'warn');

        var blah = ES6ValidateFilter(tree, {
            whitelist: {
                resolver: ['default']
            }
        });

        should.exist(blah);
        should.exist(blah.write);

        blah.write(readTree, path.join(__dirname, 'fixtures', 'temp')).then(function () {
            warnStub.callCount.should.equal(3);
            warnStub.secondCall.args[0].should.containEql('baz');
            warnStub.secondCall.args[0].should.containEql('Cannot find "missing" export for "foo"');
            warnStub.thirdCall.args[0].should.containEql('baz');
            warnStub.thirdCall.args[0].should.containEql('Cannot find module "notfound"');

            done();
        }, function (err) {
            done(err);
        });
    });

    it('validates import statements with renamed modules', function (done) {
        var tree = 'test/fixtures/renamed';

        var warnStub = sandbox.stub(console, 'warn');

        var blah = ES6ValidateFilter(tree, {
            whitelist: {
                resolver: ['default']
            },
            moduleName: function (name) {
                return 'appkit/' + name;
            }
        });

        should.exist(blah);
        should.exist(blah.write);

        blah.write(readTree, path.join(__dirname, 'fixtures', 'temp')).then(function () {
            warnStub.callCount.should.equal(3);
            warnStub.secondCall.args[0].should.containEql('appkit/baz');
            warnStub.secondCall.args[0].should.containEql('Cannot find "missing" export for "appkit/foo"');
            warnStub.thirdCall.args[0].should.containEql('appkit/baz');
            warnStub.thirdCall.args[0].should.containEql('Cannot find module "appkit/notfound"');

            done();
        }, function (err) {
            done(err);
        });
    });
});