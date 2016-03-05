# [gulp](https://github.com/wearefractal/gulp)-template-compile

> Compile [Lo-Dash templates](http://lodash.com/docs#template) (should work with [Underscore templates](http://underscorejs.org/#template) too).

## Synopsis

This plugin is heavily inspired by [Emanuele Ingrosso](https://www.npmjs.com/package/gulp-template-compile-es6).

I've written [another plugin](https://github.com/yaireo/gulp-file-contents-to-modules) which only exports templates' string and can also wrap them with a compilation function

## Install

Install with [npm](https://www.npmjs.org/package/gulp-template-compile-es6)

```
npm i --save-dev gulp-template-compile-es6
```

## Example

### `gulpfile.js`

```js
var gulp     = require('gulp');
var template = require('gulp-template-compile-es6');
var concat   = require('gulp-concat');

gulp.task('default', function () {
	gulp.src('src/*.html')
		.pipe(template({
            templateSettings : {
                variable : 'data'
            }
        })) // pass any settings here
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('dist'));
});
```

### Above will output the file `templates.js`:

(for 2 simple html files `a.html` & `b.html` which contains the string "foo" & "bar")

```js
export var a = function(data) {
    var __t, __p = '';
    __p += 'foo';
    return __p;
}

export var b = function(data) {
    var __t, __p = '';
    __p += 'bar';
    return __p;
}


## API

See the [Lo-Dash `_.template` docs](http://lodash.com/docs#template).


### template(options)

### options

Type: `Object`

#### options.name

Type: `Function`
Default: *Relative template path. Example: `templates/list.html`*

You can override the default behavior by supplying a function which gets the current [File](https://github.com/wearefractal/vinyl#constructoroptions) object and is expected to return the name.

Example:

```js
{
    name: function (file) {
        return 'tpl-' + file.relative;
    }
}
```

#### options.namespace
Type: `String`
Default: 'JST'

The namespace in which the precompiled templates will be assigned. Starting from version **1.0** you could also provide a dotted namespace that will be correctly handled, thanks to **fhawkes**. For example 'custom.namespace' will result in `window['custom']['namespace']`.

#### options.templateSettings
Type: `Object`
Default: null

[Lo-Dash `_.template` options](http://lodash.com/docs#template).


## License

MIT © Yair Even-Or
