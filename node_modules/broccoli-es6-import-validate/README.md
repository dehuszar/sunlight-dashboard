broccoli-es6-import-validate
============================

A Broccoli plugin for validating ES6 module imports

### Usage

```js
module.exports = function (broccoli) {
    var validateEs6 = require('broccoli-es6-import-validate');

    var es6Files = broccoli.makeTree('script');

    var validatedEs6Files = validateEs6(es6Files, {
    	// Whitelist modules here
        whitelist: {
        	// Name of module, and array of named exports (use default name for default export)
            resolver: ['default']
        },
        // Customize module names here
        moduleName: function (name, fullPath) {
        	return name;
        }
    });

    return [validatedEs6Files];
};
```

### License

Copyright 2014 Jacob Gable, MIT License (See repo for source of license).
