xls2xform
===========

[![Build Status](https://travis-ci.org/lykmapipo/xls2xform.svg?branch=master)](https://travis-ci.org/lykmapipo/xls2xform)

A nodejs wrapper for [pyxform](https://github.com/SEL-Columbia/pyxform) to convert [XLSForm](http://xlsform.org/) to [xForm](http://opendatakit.github.io/odk-xform-spec/).

*Note!: There is an API break when migrating to version 1.0.0+. All warnings and error found during convertion are processed and returned. You will only use error first callback style `callback(error, xform)`*

## Installation
- Installing [pyxform](https://github.com/SEL-Columbia/pyxform) globally
```sh
$ sudo pip install pyxform
```

- Then install `xls2xform`
```sh
$ npm install --save xls2xform
```

## Usage
- Using system python
```js
var xls2xform = require('xls2xform');

xls2xform(<path_to_xlsform>, function(error, xform){
    //process error if any
    ...
    //use returned xform  
    ...  
});
```
- Using custom python
```js
var xls2xform = require('xls2xform');

xls2xform(<path_to_xlsform> , {
        pythonPath: <path_to_custom_python>
    }, function(error, xform) {
        //process error if any
        ...
        //use returned xform  
        ...
    });
```

## TODOS
- [ ] cross check meta definitions

## Testing

* Clone this repository

* Install all dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```

## Development
`xls2xform` has set of useful `grunt` tasks to help you with development. By running

```sh
$ grunt
```

`xls2xform` will be able watch your development environment for file changes and apply `jshint` and `mocha test` to the project.

## Contribute
Fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
