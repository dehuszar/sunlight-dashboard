'use strict';

var _ = require('lodash'),
    ES6ModuleFile = require('es6-import-validate').ES6ModuleFile;

function BroccoliES6ModuleFile(opts) {
    ES6ModuleFile.apply(this, _.toArray(arguments));
}

_.extend(BroccoliES6ModuleFile.prototype, ES6ModuleFile.prototype);

_.extend(BroccoliES6ModuleFile.prototype, {
    // Broken out to let the moduleName options override
    getModuleName: function (filePath) {
        var name = ES6ModuleFile.prototype.getModuleName.apply(this, _.toArray(arguments));

        if (_.isFunction(this.opts.moduleName)) {
            name = this.opts.moduleName(name, filePath);
        }

        return name;
    },
});

BroccoliES6ModuleFile.getErrorsFromAnalyzedInfos = ES6ModuleFile.getErrorsFromAnalyzedInfos;

module.exports = BroccoliES6ModuleFile;
