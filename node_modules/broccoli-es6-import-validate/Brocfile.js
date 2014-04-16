'use strict';

module.exports = function (broccoli) {
    var validateEs6 = require('./index');

    var regularTree = broccoli.makeTree('test/fixtures/regular');

    return [validateEs6(regularTree, {
        whitelist: {
            resolver: ['default']
        }
    })];
};
