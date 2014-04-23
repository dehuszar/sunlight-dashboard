'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    Filter = require('broccoli-filter'),
    BroccoliES6ModuleFile = require('./lib/BroccoliES6ModuleFile'),
    helpers = require('broccoli-kitchen-sink-helpers');

function ES6ValidateFilter(inputTree, options) {
    if (!(this instanceof ES6ValidateFilter)) {
        return new ES6ValidateFilter(inputTree, options);
    }

    this.inputTree = inputTree;

    this.options = _.defaults(options || {}, ES6ValidateFilter.Defaults);

    this.infos = {};
}

// Inherit from Filter
ES6ValidateFilter.prototype = Object.create(Filter.prototype);
ES6ValidateFilter.prototype.constructor = ES6ValidateFilter;

// Extend the inherited methods
_.extend(ES6ValidateFilter.prototype, {
    // Set extensions supported
    extensions: ['js'],
    targetExtension: 'js',

    write: function (readTree, destDir) {
        var self = this;

        // Call the super which processes all files, then afterwards display any errors
        return Filter.prototype.write.apply(this, _.toArray(arguments))
            .then(function () {
                var errorsFound = BroccoliES6ModuleFile.getErrorsFromAnalyzedInfos(self.infos, self.options);

                if (errorsFound.length) {
                    console.warn(chalk.red('>> ') + chalk.yellow('Errors found in module import statements'));
                    errorsFound.forEach(function (err) {
                        console.warn(chalk.red('>> ') + chalk.yellow(err.name) + chalk.red(': ') + err.message);
                    });
                }
            });
    },

    processFile: function (srcDir, destDir, relativePath) {
        var self = this,
            moduleFile = new BroccoliES6ModuleFile({
                cwd: srcDir,
                moduleName: this.options.moduleName
            }),
            fullPath = path.join(srcDir, relativePath);

        return moduleFile.analyzeFile(fullPath)
            .then(function (info) {
                info.dest = path.join(destDir, relativePath);

                self.infos[info.name] = info;

                helpers.copyPreserveSync(fullPath, info.dest);

                // TODO: Not sure what is appropriate to return for caching here
                return info.contents.toString();
            });
    }
});

// Default option values
ES6ValidateFilter.Defaults = {
    whitelist: {},
    moduleName: function (name, filePath) {
        return name;
    }
};

module.exports = ES6ValidateFilter;
